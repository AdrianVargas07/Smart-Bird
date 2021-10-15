import path from 'path';

class HomeController {
  constructor() {

  }

  getHomePage(req, res) {
    // res.status(200).sendFile(path.join(process.cwd(), 'public/Home.xhtml'));
    res.render('Home', {
      title: 'HomePage',
      stylesheets: ['/css/common.css', '/css/Home.css'],
      scripts: ['/js/Home.js'],
    });
  }
}

// Singleton
const homepage = new HomeController();
export default homepage;
