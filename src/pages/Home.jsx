export default function Home() {
  return (
    <>
      {/* WELCOME STRIP */}
      <div
        className="text-center text-white py-3 mb-4"
        style={{ background: "#1f3556" }}
      >
        <h4 className="mb-0">
          WELCOME TO SRI SATYANARAYANA SWAMY TEMPLE
        </h4>
      </div>

      {/* HERO TEMPLES */}
      <div className="row mb-5 text-center">
        {[
          { img: "/home/img1.jpg", name: "" },
          { img: "/home/img2.jpg", name: "" },
          
        ].map((t, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <div className="position-relative">
              <img
                src={t.img}
                className="img-fluid rounded"
                alt={t.name}
              />
              <div
                className="position-absolute bottom-0 w-100 text-white py-2"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                {t.name}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* POPULAR SEVAS */}
      <h4 className="text-center mb-4">POPULAR SEVAS</h4>

      <div className="row text-center mb-4">
        {[
          { img: "/home/archana.jpg", name: "ARCHANA" },
          { img: "/home/abhishekam.jpg", name: "ABHISHEKAM" },
          { img: "/home/satyanarayana.jpg", name: "SATYANARAYANA PUJA" }
        ].map((s, i) => (
          <div className="col-md-4 mb-3" key={i}>
            <img
              src={s.img}
              alt={s.name}
              className="img-fluid rounded-circle mb-2"
              style={{
                width: 160,
                height: 160,
                objectFit: "cover"
              }}
            />
            <h6>{s.name}</h6>
          </div>
        ))}
      </div>

      <div className="text-center mb-5">
        <a href="/sevas" className="btn btn-outline-secondary">
          VIEW MORE SEVAS
        </a>
      </div>

      {/* TEMPLE HISTORY */}
      <div
        className="row align-items-center text-white p-4 mb-5 rounded"
        style={{ background: "#1f3556" }}
      >
        <div className="col-md-4 mb-3">
          <img
            src="/home/history.jpg"
            alt="Temple History"
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h4>TEMPLE HISTORY</h4>
          <p>
            Established in 1985, Sri Maha Lakshmi Temple has been a
            cornerstone of spiritual and community life, attracting
            devotees from across the region.
          </p>
          <a href="/history" className="btn btn-light">
            VIEW FULL TEMPLE HISTORY
          </a>
        </div>
      </div>
    </>
  );
}
