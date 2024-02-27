import React from 'react'

function BlogL2() {
  return (
   <>
    <section>
  <div class="container">
    <div class="row align-items-end mb-5 justify-content-between">
      <div class="col-12 col-lg-5">
        <div>
          <h2 class="mb-0"><span class="font-w-4 d-block">From Our Blog</span> List Latest Feed</h2>
        </div>
      </div>
      <div class="col-12 col-lg-6 mt-3 my-lg-0">
        <p class="lead mb-0">AdvocateIron Amazing Landing Page of businesses need access to development resources.</p>
      </div>
    </div>
    {/* <!-- / .row --> */}
    <div class="row">
      <div class="col">
        {/* <!-- Blog Card --> */}
        <div class="card bg-transparent flex-md-row align-items-center p-md-0 p-3">
          <div class="col-md-4">
            <img class="img-fluid" src={require("../../assets/images/blog/01.jpg")} alt="Image1"/>
          </div>
          <div class="card-body col-md-6">
            <div>
              <div class="d-inline-block bg-light text-center px-2 py-1 rounded me-2"><span class="text-primary">05</span>
                Sep</div> <a class="d-inline-block btn-link" href="/">Sass</a>
            </div>
            <h2 class="h5 my-3">
                <a class="link-title" href="blog-single.html">AdvocateIron trending landing page 2020</a>
              </h2>
            <ul class="list-inline mb-0">
              <li class="list-inline-item pe-3"> <a href="/public" class="list-group-item-action"><i class="lar la-user-circle ms-1 text-primary ic-1x"></i> Admin</a>
              </li>
              <li class="list-inline-item pe-3"> <a href="/" class="list-group-item-action"><i class="las la-eye ms-1 text-primary ic-1x"></i> 275</a>
              </li>
              <li class="list-inline-item"> <a href="/" class="list-group-item-action"><i class="lar la-comments ms-1 text-primary ic-1x"></i> 300</a>
              </li>
            </ul>
          </div>
          <div class="col-md-2"> <a href="blog-listing.html" class="btn btn-primary">
                Read More
              </a>
          </div>
        </div>
        {/* <!-- End Blog Card --> */}

        {/* <!-- Blog Card --> */}
        <div class="card bg-transparent flex-md-row align-items-center p-md-0 p-3 mt-5">
          <div class="col-md-4">
            <img class="img-fluid" src={require("../../assets/images/blog/02.jpg")} alt="Image2"/>
          </div>
          <div class="card-body col-md-6">
            <div>
              <div class="d-inline-block bg-light text-center px-2 py-1 rounded me-2"><span class="text-primary">05</span>
                Sep</div> <a class="d-inline-block btn-link" href="/">Software</a>
            </div>
            <h2 class="h5 my-3">
                <a class="link-title" href="blog-single.html">The evolution of landing page creativity</a>
              </h2>
            <ul class="list-inline mb-0">
              <li class="list-inline-item pe-3"> <a href="/" class="list-group-item-action"><i class="lar la-user-circle ms-1 text-primary ic-1x"></i> Admin</a>
              </li>
              <li class="list-inline-item pe-3"> <a href="/" class="list-group-item-action"><i class="las la-eye ms-1 text-primary ic-1x"></i> 275</a>
              </li>
              <li class="list-inline-item"> <a href="/" class="list-group-item-action"><i class="lar la-comments ms-1 text-primary ic-1x"></i> 300</a>
              </li>
            </ul>
          </div>
          <div class="col-md-2"> <a href="blog-listing.html" class="btn btn-primary">
                Read More
              </a>
          </div>
        </div>
        {/* <!-- End Blog Card --> */}
      </div>
    </div>
  </div>
</section>
   </>
  )
}

export default BlogL2
