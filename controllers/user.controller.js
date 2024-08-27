const userdetails = (req ,res) => {
    return res.status(200).json(
        {
            message: "User Details"
        }
    )    
}

module.exports = userdetails;