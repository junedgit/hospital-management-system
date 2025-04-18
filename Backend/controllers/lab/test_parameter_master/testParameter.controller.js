import TestParameter from "../../../models/lab/test_parameter_master/testParameter.model";


const createTestParameter = async (req, res) => {
    try {
        const { sectionName, department, group, charge, testDetails } = req.body;
        const clinicId= req.user.id;

        // Validate required fields
        if (!sectionName || !department || !group || !charge || !testDetails) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        const newTestParameter = new TestParameter({
            sectionName,
            department,
            group,
            charge,
            testDetails,
            clinicId
        });

        const savedTestParameter = await newTestParameter.save();

        return res.status(201).json({
            message: "Test parameter added successfully",
            data: savedTestParameter,
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



 const allTestParameters = async (req, res) => {
    try {
        let { page, limit, sectionName, department, group, testName } = req.query;

        // Convert page & limit to numbers, set default values
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        // Build filter object dynamically
        const clinicId= req.user.id;
        let filter = {clinicId};
        if (sectionName) filter.sectionName = { $regex: new RegExp(sectionName, "i") };
        if (department) filter.department = { $regex: new RegExp(department, "i") };
        if (group) filter.group = { $regex: new RegExp(group, "i") };
        if (testName) filter["testDetails.testName"] = { $regex: new RegExp(testName, "i") };

        // Fetch filtered & paginated data
        const testParameters = await TestParameter.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // Get total count for pagination
        const total = await TestParameter.countDocuments(filter);

        return res.status(200).json({
            message: "Test parameters fetched successfully",
            data: testParameters,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
            },
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

export const getTestParameter = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch test by ID
        const testParameter = await TestParameter.findById(id);

        if (!testParameter) {
            return res.status(404).json({ message: "Test parameter not found" });
        }

        return res.status(200).json({
            message: "Test parameter fetched successfully",
            data: testParameter,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

import TestParameter from "../models/TestParameter.js"; // Import the model

export const updateTestParameter = async (req, res) => {
    try {
        const { id } = req.params; // Get test parameter ID from request params
        const updateData = req.body; // Get update fields from request body

        // Only allow specific fields to be updated
        const allowedFields = ["sectionName", "department", "group", "charge", "testDetails"];
        const filteredData = {};

        // Filter only the allowed fields
        for (const key of Object.keys(updateData)) {
            if (allowedFields.includes(key)) {
                filteredData[key] = updateData[key];
            }
        }

        if (Object.keys(filteredData).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // Find and update the test parameter with the filtered data
        const updatedTest = await TestParameter.findByIdAndUpdate(
            id,
            { $set: filteredData }, // Only update allowed fields
            { new: true, runValidators: true } // Return updated doc & enforce validation
        );

        if (!updatedTest) {
            return res.status(404).json({ message: "Test Parameter not found" });
        }

        res.status(200).json(updatedTest);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export { createTestParameter,allTestParameters ,getTestParameter};