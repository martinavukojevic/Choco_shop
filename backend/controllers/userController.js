import userModel from '../models/userModel.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';



const createToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET)
}



const loginUser = async (req, res) => {

        try {
                const { email, password } = req.body;

                const user = await userModel.findOne({ email });

                if (!user) {
                        return res.json({ success: false, message: "User doesn't exist!" })
                }
                const isMatch = await bcrypt.compare(password, user.password);

                if (isMatch) {

                        const token = createToken(user._id)
                        res.json({ success: true, token })

                } else {
                        res.json({ success: false, message: 'Invalid data provided!' })
                }

        } catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message })
        }

}


const registerUser = async (req, res) => {
        try {
                const { name, email, password } = req.body;


                const exists = await userModel.findOne({ email })
                if (exists) {
                        return res.json({ success: false, message: "User already exists!" })
                }


                if (!validator.isEmail(email)) {
                        return res.json({ success: false, message: "Please enter a valid email!" })
                }

                if (password.length < 8) {
                        return res.json({ success: false, message: "Please enter a strong password(min. 8 characters)!" })
                }

                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(password, salt)

                const newUser = new userModel({
                        name,
                        email,
                        password: hashedPassword
                })

                const user = await newUser.save()

                const token = createToken(user._id)

                res.json({ success: true, token })

        } catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message })
        }
}


const adminLogin = async (req, res) => {


        try {

                const { email, password } = req.body

                if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
                        const token = jwt.sign(email + password, process.env.JWT_SECRET);
                        res.json({ success: true, token })
                }
                else {
                        res.json({ success: false, message: "Invalid data provided!" })
                }

        } catch (error) {
                console.log(error);
                res.json({ success: false, message: error.message })
        }
}


const getAllUsers = async (req, res) => {
        try {
                const searchTerm = req.query.search;
                let query = {};


                if (searchTerm) {
                        query = {
                                $or: [
                                        { name: { $regex: searchTerm, $options: 'i' } },
                                        { email: { $regex: searchTerm, $options: 'i' } }
                                ]
                        };
                }


                const users = await userModel.find(query).select('-password');

                res.json({ success: true, users });
        } catch (error) {
                console.error("Error fetching users:", error);
                res.status(500).json({ success: false, message: "Error fetching users." });
        }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID is required.' });
    }

    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};



const aboutUser = async (req, res) => {
  try {
    const userId = req.body.userId; 
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized!' });
    }

    const user = await userModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.body.userId; 
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Not authorized!' });
    }

    const { name, email, password } = req.body;
    const updateData = { name, email };

    if (password && password.length >= 8) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true }).select('-password');

    res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { loginUser, registerUser, adminLogin, getAllUsers,deleteUser, aboutUser, updateUser }