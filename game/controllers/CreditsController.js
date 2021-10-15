import path from 'path';

class CreditsController {
  constructor() {

  }

  getCreditsPage(req, res) {
    // res.status(200).sendFile(path.join(process.cwd(), 'public/Home.xhtml'));
    res.render('Credits', {
      title: 'Credits',
      stylesheets: ['/css/common.css', '/css/Credits.css'],
      scripts: [],
    });
  }
}

// Singleton
const creditsPage = new CreditsController();
export default creditsPage;
