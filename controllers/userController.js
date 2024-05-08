const User = require('../Model/userModel');
const schedule = require('node-schedule');

const createUser = async (req, res) => {
    try {
        let { user_id, token, machine_limit, time_frame, unmodified_user } = req.body;

        const existingUser = await User.findOne({ user_id });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        unmodified_user = user_id;

        const user = await User.create({
            user_id, token, machine_limit, time_frame, unmodified_user
        });

        res.status(201).json({ message: 'User created successfully', status: 201, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}

const getAllUser = async(req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ nbHits: users.length, users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}


// const chnageUser = async () => {
//     try {
//         // Find users whose timeFrame is greater than 0
//         const stoppedUser = await User.find({ status: false});

//         // Update the timeFrame of those users
//         await Promise.all(stoppedUser.map(async (user) => {
//             user.user_id = null
//             await user.save();
//         }));

//         console.log("user change to null successfully");
//     } catch (error) {
//         console.error( error);
//         res.status(500).json({error: error.message})
//     }
// }

const pauseTools = async(req, res) => {
 

    try {
        const { user_id } = req.body;
        const user = await User.findOneAndUpdate({ user_id }, { status: false, user_id: user_id + '1867ms00226' }, { new: true });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User paused successfully', user });
      } catch (error) {
        console.error('Error pausing user:', error);
        res.status(500).json({ error: error.message });
      }
}


const resumeTools = async(req, res) => {
    try {
        const { unmodified_user } = req.body;
        const user = await User.findOne({unmodified_user})
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

        user.status = true
        user.user_id = unmodified_user

        await user.save()
        
        //   if (user_id.endsWith('1867ms00226')) {
        //     user_id = user.unmarkModified // Remove the last 5 characters ('admin')
        //   }
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}





const decrementTimeFrame = async () => {
    try {
        // Find users whose timeFrame is greater than 0
        const usersToUpdate = await User.find({ time_frame: { $gt: 0 } });


        // Update the timeFrame of those users
        await Promise.all(usersToUpdate.map(async (user) => {
            user.time_frame -= 1;
            user.status = false
            user.user_id = user.unmodified_user
            await user.save();
        }));

        console.log("TimeFrames decremented successfully.");
    } catch (error) {
        console.error("Error decrementing timeFrames:", error);
    }
}

// Schedule the decrementTimeFrame function to run every day at midnight
const decrementTimeFrameJob = schedule.scheduleJob('0 0 * * *', decrementTimeFrame);

const offTools = async () => {
    try {
        // Get the current date without the time
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0

        // Find users whose time_frame has passed (i.e., is less than the current date)
        const usersToUpdate = await User.find({ time_frame: { $lt: currentDate }, status: true });

        // Update the status of those users to false
        await Promise.all(usersToUpdate.map(async (user) => {
            user.status = false;
            user.user_id = user.user_id + '1867ms00226'
            await user.save();
        }));

        console.log("Users' status updated successfully.");
    } catch (error) {
        console.log(error);
    }
}

// Schedule the offTools function to run every day at midnight
const offToolsJob = schedule.scheduleJob('0 0 * * *', offTools);


const updateMachineName = async(req, res) => {
    try {
        const { user_id,  token, machine_name } = req.body;
    
        // Find the user by user_id
        let user = await User.findOne({ user_id });
    
        if (!user) {
          // If the user does not exist, return an error message
          return res.status(404).json({ error: 'User not registered' });
        }
    
        // Update the user's record to include the new machine_name
        if (!user.machine_name.includes(machine_name)) {
          user.machine_name.push(machine_name);
          await user.save();
        }
    
        // Return a success message along with the updated user record
        res.status(200).json({ message: 'Machine name saved successfully', user });
      } catch (error) {
        console.error('Error saving machine name:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}


  

module.exports = {
    createUser,
    getAllUser,
    pauseTools,
    resumeTools,
    updateMachineName
};
