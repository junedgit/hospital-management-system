export const validateTemplateFields = (req, res, next) => {
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections)) {
        return res.status(400).json({ success: false, message: "Invalid sections data" });
    }

    const allSelectedFields = new Set();
    
    for (const section of sections) {
        if (!section.selectedFields) continue;

        for (const field of section.selectedFields) {
            if (allSelectedFields.has(field)) {
                return res.status(400).json({ success: false, message: `Field '${field}' is selected multiple times across sections.` });
            }
            allSelectedFields.add(field);
        }
    }

    next();
};
