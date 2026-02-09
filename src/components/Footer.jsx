export default function Footer() {
  return (
    <footer
      className="text-white mt-5"
      style={{ background: "#1f3556" }}
    >
      <div className="container py-4">
        <div className="row">

          <div className="col-md-4">
            <h6>QUICK LINKS</h6>
            <p>Home</p>
            <p>Sevas</p>
            <p>Gallery</p>
          </div>

          <div className="col-md-4 text-center">
            <img src="/home/temple-logo.png" height="50" />
            <p className="mt-2">Sri Maha Lakshmi Temple</p>
          </div>

          <div className="col-md-4">
            <h6>CONTACT US</h6>
            <p>Email: info@srimahalakshmi.org</p>
            <p>Phone: +91 XXXXX XXXXX</p>
          </div>

        </div>

        <hr />
        <p className="text-center mb-0">
          © 2024 Sri Maha Lakshmi Temple. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
