const {Courier,CourierStatus} = require('../models/courier.model.js');
const winston = require('winston');
const {triggerNotification,sendEmail} = require('../functions/email.func.js');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: './public/audit.log' })
    ]
});
const createcuriour =  async(req,res) =>{
      const role = req.user.role;
      if(role!='courior manager' || role!='admin'){
        return res.status(409).json(
            {
                message: "You are not authorized to update"
            }
        )
      }

      const{sender_name,sender_address,sender_contact,recipient_name,recipient_address,recipient_contact,recipient_email,package_weight,package_dimensions,package_type,notify} = req.body;
      const courierExisted= await Courier.findOne({package_weight,package_dimensions,package_type});
      if(courierExisted){
        return res.status(409).json(
            {
                message: "Courier Already exists"
            }
        )
      }
      const id = req.user;
      const courier =  await Courier.create({
        sender_name,
        sender_address,
        sender_contact,
        recipient_name,
        recipient_address,
        recipient_contact,
        recipient_email,
        package_weight,
        package_dimensions,
        package_type,
        notify,
        Company_Admin:id

      })
       
      if(courier){
        logger.info(`New courier created with ID: ${courier._id}.`);
        const newCourier = await CourierStatus.create({status: 'Pending',courier_id:courier._id});
        return res.status(409).json(
            {
                message: "Courier Added successfully",
                status: newCourier
            }
        )
    }
}

const deletecuriour = async(req,res) => {
    const role = req.user.role;
    if(role!='courior manager' || role!='admin'){
        return res.status(409).json(
            {
                message: "You are not authorized to update"
            }
        )
      }
    const id = req.query.id;
    console.log(`id ${id}`);
    const courier  = await Courier.findById(id);   
    
    if(!courier){
        return res.status(404).send('Courier not found');
    }
    const couristaus =  await CourierStatus.findOne({courier_id:id});

    
     courier.save();
    if (couristaus.status === 'delivered') {
        return res.status(403).send('Cannot delete a delivered courier');
    }
    logger.info(`Courier ${id} deleted. Status: ${courier.status}`);
    await CourierStatus.findByIdAndDelete(couristaus._id);
    await Courier.findByIdAndDelete(id);
    return res.status(204).send("Courier deleted successfully");

    // return res.status(204).json({
    //     message: "Courier deleted successfully"
    // });

}

const updatecuriour = async(req,res) => {
    const role = req.user.role;
    if(role!='courior manager' || role!='ADMIN'){
        return res.status(409).json(
            {
                message: "You are not authorized to update"
            }
        )
      }
    const id = req.query.id;
    

    const { recipient_address, status } = req.body;
    try {
        const courier = await Courier.findById(id);
        
        if (!courier) {
            return res.status(404).send('Courier not found');
        }
        
        if (recipient_address){courier.recipient_address = recipient_address;}

        const couristaus =  await CourierStatus.findOne({courier_id:id});
       
        couristaus.status = status;
        courier.updatedAt = Date.now();

        
       if(courier.notify =='SMS'){
        await triggerNotification(courier.notify,courier.recipient_contact,status);
       }
       else if(courier.notify =='Email'){
        await triggerNotification(courier.notify,courier.recipient_email,status);
       }
    
        await courier.save();
        await couristaus.save();
       
        return res.status(200).json(
            {
                message: "updated the status successfully"
            }
        )
    }
    catch (err) {
        res.status(500).send('Error updating courier details');
    }
}

module.exports = {createcuriour,deletecuriour,updatecuriour};