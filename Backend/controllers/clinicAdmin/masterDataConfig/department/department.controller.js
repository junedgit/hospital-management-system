import Department from "../../../../models/clinicAdmin/masterDataConfig/department/department.model.js";

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const clinicId = req.user.id; 
        console.log(clinicId);

        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Check if department already exists in the same clinic
        const existingDepartment = await Department.findOne({ name, clinicId });

        if (existingDepartment) {
            return res.status(400).json({
                success: false,
                message: "Department with this name already exists in this clinic.",
            });
        }

        // Create and save the new department
        const department = new Department({ name, description, clinicId });
        await department.save();

        res.status(201).json({
            success: true,
            message: "Department added successfully.",
            department,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error adding department.",
        });
    }
};


const editDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedDepartment) {
            return res.status(404).json({
                success: false,
                message: "Department not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Department updated successfully.",
            department: updatedDepartment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error updating department.",
        });
    }
};

const getDepartments = async (req, res) => {
    try {
        const clinicId = req.user.clinicId;

        if (!clinicId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Clinic ID not found in user data.",
            });
        }

        // Fetch only the departments of the respective clinic
        const departments = await Department.find({ clinicId });

        if (departments.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No departments found for this clinic.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Departments retrieved successfully.",
            departments,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error retrieving departments.",
        });
    }
};


export {
    addDepartment,
    editDepartment,
    getDepartments,
}