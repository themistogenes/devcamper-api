const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find({});

    res.status(200).json({
      success: true,
      msg: 'Retrieved all bootcamps',
      count: bootcamps.length,
      data: bootcamps
    })
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    // Prevent a properly formatted id from sending back a 200 status
    if (!bootcamp) {
      // Must return to avoid sending back multiple headers
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      msg: `Retrieved bootcamp ${req.params.id}`,
      data: bootcamp
    })
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      msg: 'Created new bootcamp',
      data: bootcamp
    })
  } catch (error) {
    res.status(400).json({ success: false });
  }
}

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true,
        runValidators: true
      });

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }
  
    res.status(200).json({
      success: true,
      msg: `Updated bootcamp ${req.params.id}`,
      data: bootcamp
    })    
  } catch (error) {
    res.status(400).json({ success: false })
  }
}

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: true,
      msg: `Deleted bootcamp ${req.params.id}`,
      data: {}
    })
  } catch (error) {
    res.status(400).json({ success: false });
  }
}