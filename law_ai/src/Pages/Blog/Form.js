import React from 'react'

function Form2() {
  return (
    <>
         <form id="contact-form" className="row" method="post" action="contact.php">
              <div className="messages" />
              <div className="form-group col-sm-6">
                <input id="form_name" type="text" name="name" className="form-control" placeholder="Name" required="required" data-error="Name is required." />
                <div className="help-block with-errors" />
              </div>
              <div className="form-group col-sm-6">
                <input id="form_email" type="email" name="email" className="form-control" placeholder="Email" required="required" data-error="Valid email is required." />
                <div className="help-block with-errors" />
              </div>
              <div className="form-group mb-0 col-sm-12">
                <textarea id="form_message" name="message" className="form-control h-auto" placeholder="Your Comment" rows={4} required="required" data-error="Please,leave us a message." defaultValue={""} />
                <div className="help-block with-errors" />
              </div>
              <div className="col-sm-12">
                <button className="btn btn-primary mt-5">Post Comment</button>
              </div>
            </form>
    </>
  )
}

export default Form2
