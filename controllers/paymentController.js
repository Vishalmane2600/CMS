const {Company} = require('../models/company.model.js')
const {Admin} = require('../models/admin.model.js');

// const paypal = require('@paypal/checkout-server-sdk');

// // Configure PayPal environment
// let environment = new paypal.core.SandboxEnvironment(process.env.PAYPAL_ID,process.env.CLIENT_SECRET);
// let client = new paypal.core.PayPalHttpClient(environment);


const createOrder = async(req,res)=>{

    const{ name,contact,address,email,sub_price} =  req.body;

    const userExisted= await Company.findOne({email});
    if(userExisted){ return res.status(409).json(
            {
                message: "company Already exists"
            }
        )
    }
    const user =  await Company.create({
        name,
        contact,
        address,
        email,
        sub_price
       })
       const user_id  =  req.userid;
       const role = 'ADMIN';

      const admin = await Admin.create({
        role,
        user_id,
        company_id:user._id,
      });
       
       if(!user){
        return res.status(500).json(
            {
                message: "Failed to create company"
            }
        )
       }
       return res.status(500).json(
        {
            message: "Company Registration Done successfully and Now you are Admin of your company ",
            Company_Deatail : user,
            admin : admin
        }
    )
       
    //    const amount = sub_price; 

       
    //    const request = new paypal.orders.OrdersCreateRequest();
    //    request.prefer("return=representation");
    //    request.requestBody({
    //        intent: 'CAPTURE',
    //        purchase_units: [{
    //            amount: {
    //                currency_code: 'USD',
    //                value: amount
    //            },
    //            description: `Subscription Plan: ${sub_price}`
    //        }],
    //        application_context: {
    //            return_url: 'http://localhost:8000/user/company/success',
    //            cancel_url: 'http://localhost:8000/user/company/failure',
    //        }
    //    });
   
    //    try {
    //        const order = await client.execute(request);
   
    //        // Redirect the user to PayPal for payment approval
    //        res.redirect(order.result.links.find(link => link.rel === 'approve').href);
    //    } catch (err) {
    //        console.error(err);
    //        res.status(500).send('Error creating PayPal order');
    //    }


}

const success = async(req,res)=>{
    const { token } = req.query;

    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        console.log('Payment successful:', capture.result);

        // You can save the order details to your database and render a success page
        res.send('Payment successful! Thank you for your subscription.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error capturing PayPal order');
    }
   
}

const failure= (req, res) => {
    res.send('Payment cancelled.');
}

module.exports = {
    createOrder,success,failure
}