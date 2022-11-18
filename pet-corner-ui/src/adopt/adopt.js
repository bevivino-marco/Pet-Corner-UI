import React  from 'react';


function Adopt() {
  return (
    <>
        <div className='row align-items-right' >
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li className="nav-item">
                <input>
                </input>
                <button>SEARCH

                </button>
                </li>
            
                <li className="nav-item">Filters<i class="bi bi-filter-square "></i></li>
            
                <li className="nav-item">Sort by<i class="bi bi-filter-left"></i></li>
            </ul>
            </div>
            <div>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-right mb-md-4">
            <li className="nav-item">
                <button>DOGS</button>
                </li>
                <li className="nav-item">
                <button>CATS</button>
                </li>
                <li className="nav-item">
                <button>RABBITS</button>
                </li>
            </ul>

            </div>
            <div>
            <div className="album py-5 bg-light">
                <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col">
                    <div className="card shadow-sm">
                        <svg className="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                        <div className="card-body">
                        <ul>
                        <li>Name:</li>
                        <li>Age:</li>
                        <li>Provenance:</li>
                        </ul>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
    </>

  );
}

export default Adopt;