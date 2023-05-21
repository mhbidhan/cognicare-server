const Color = require('colorjs.io').default;
const ColorThief = require('colorthief');

async function evaluateFindColors(req, res) {
  try {
    const { img, assignedColor } = req.body;

    const dominatingColor = await ColorThief.getColor(img);

    const color = new Color('sRGB', assignedColor);
    const imgColor = new Color('sRGB', dominatingColor);

    const match = color.deltaE(imgColor);

    if (match < 3500) {
      return res.status(200).json('you won');
    } else {
      return res.status(200).json('Better luck next time');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

module.exports = {
  evaluateFindColors,
};
