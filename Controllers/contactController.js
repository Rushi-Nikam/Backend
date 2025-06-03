const contactus = require('../models/contactModel');


const handleContactUs = async (req, res) => {
    const { name, email, mobile_number, message } = req.body;

    try {
        const result = await contactus(name, email, mobile_number, message);
        
        console.log(result); 

        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully!',
            insertId: result.insertId 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message', 
            error: error.message 
        });
    }
};

module.exports = handleContactUs;
