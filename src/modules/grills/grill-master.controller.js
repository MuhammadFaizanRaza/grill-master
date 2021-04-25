/**
 * Main view for input json or response controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const mainView = async (req, res, next) => {
  try {
    res.render('main');
  } catch (e) {
    console.log(e);
  }
};

/**
 * Grill view for input json or response controller
 * @param {Request} req express request object
 * @param {Response} res express response object
 * @param {Function} next express ref to next middleware
 */
const grill = async (req, res, next) => {
  try {
    const json = JSON.parse(req.body.json);
    let height = json.grill.height;
    let width = json.grill.width;
    let area = json.grill.height * json.grill.width;
    let outofgrill = '';

    let grill = `<div class="d-flex flex-wrap align-content-start" style="width: ${json.grill.width}px; height: ${json.grill.height}px; background-color: darkgrey;">`;
    json.grill.grillItems.forEach((element) => {
      let Tempwidth = width;
      if (element.count) {
        for (let i = 0; i < element.count; i++) {
          if (element.height <= height && width >= element.width) {
            grill += `<button class="btn"  style="width: ${element.width}px; height: ${element.height}px; background-color: black; margin:1px;" data-toggle="tooltip" title="${element.title}"></button>`;

            if (Tempwidth <= element.width) {
              height = height - element.height;
              Tempwidth = width;
            }
            Tempwidth = Tempwidth - element.width;
          } else {
            outofgrill += `<tr>
          <td>${element.title}</td>
          <td>${element.width}x${element.height}</td>
            </tr>`;
          }
        }
      } else {
        if (element.height <= height && width <= element.width) {
          grill += `<button class="btn" style="width: ${element.width}px; height: ${element.height}px; background-color: black; margin:1px;" title="${element.title}"></button>`;

          height = height - element.height;
          Tempwidth = Tempwidth - element.width;
        } else {
          outofgrill += `<tr>
          <td>${element.title}</td>
          <td>${element.width}x${element.height}</td>
        </tr>`;
        }
      }
    });

    grill += `</div>`;

    res.render('grill', { grill, outofgrill });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  mainView,
  grill,
};
