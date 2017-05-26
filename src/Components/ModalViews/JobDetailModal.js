import React, {Component} from 'react';
import reactCSS from 'reactcss';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

//CSS
import '../../../css/template.css';
//Styling
const styles = reactCSS({
  'default':{
    jmodal:{



    },
    jmodalbackdrop:{
      position: "fixed",
      top:"0px",
      left:"0px",
      width:"100%",
      height:"100%",
      background:"rgba(0,0,0,0.4)",
      zIndex:"990"
    },
    modalHeaderFooter:{
      background:"white"
    },

  }
});

class JobModal extends Component{
  constructor(props){
    super(props);
    this.state={
      editmode:false,
      value:'',
      _id:-1,
      title:"",
      companyID:-1,
      companyName:"",
      url:"",
      notes:"",

    }
    this.onEdit.bind(this);
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      value:'VALUE',
      _id:nextProps.job._id,
      title:nextProps.job.title,
      companyID:nextProps.job.companyID,
      companyName:nextProps.job.companyName,
      url:nextProps.job.url,
      notes:nextProps.job.notes,
    });

  }

onEdit(){
  this.setState(prevState => ({
  editmode: !prevState.editmode
}));
}

onSave(){
  this.setState({
    editmode:false
  });
  // console.log("SAVING IN MODAL",this.state.job)
  this.props.save({
    _id:this.state._id,
    title:this.state.title,
    companyID:this.state.companyID,
    companyName:this.state.companyName,
    url:this.state.url,
    notes:this.state.notes
  });
}

handleInput(event,type){

  switch(type){
    case "title":
      this.setState({title: event.target.value});
      break;
    case "companyName":
      this.setState({companyName: event.target.value});
      break;
    case "url":
      this.setState({url: event.target.value});
      break;
    case "notes":
      this.setState({notes: event.target.value});
      break;
    default:
  }
}

  render(){

    var key = 1;
    return(
      <div>
        <CSSTransitionGroup
          transitionName="modalBackground"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}

          >
        {this.props.viewdetails &&
          <div style={styles.jmodalbackdrop} onClick={()=>this.props.close()} />

        }
      </CSSTransitionGroup>

        <CSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}

          >
            {this.props.viewdetails &&
                <div key={key} className="card jModal" >
                  <div className="card-header " style={styles.modalHeaderFooter}>
                    <h5>Job</h5>
                  </div>
                  <div className="card-block">
                    <div>
                      <form>
                        <div className="form-group">
                          <label htmlFor="jobTitleInputLabel">Job Title</label>
                          {this.state.editmode?
                            <input type="text" className="form-control"
                              defaultValue={this.props.job.title} id="jobTitleInput" placeholder="" onChange={(event)=>this.handleInput(event,"title")}/>
                            :
                            <div>{this.props.job.title}</div>
                          }

                        </div>
                        <div className="form-group">
                          <label htmlFor="companyNameInputLabel">Company Name</label>
                          {this.state.editmode?
                            <input type="text" defaultValue={this.props.job.companyName} onChange={(event)=>this.handleInput(event,"companyName")} className="form-control" id="companyNameInput" placeholder=""/>
                            :
                            <div>{this.props.job.companyName}</div>
                          }
                        </div>


                          {this.state.editmode &&
                            <div className="form-group">
                              <label htmlFor="urlInputLabel">Link To Job Listing</label>
                              <input type="text" className="form-control" id="urlInputLabel" onChange={(event)=>this.handleInput(event,"url")} defaultValue={this.props.job.url} placeholder=""/>
                            </div>
                          }

                        <div className="form-group">
                          <label htmlFor="notesInputLabel">Notes</label>
                          {this.state.editmode?
                            <textarea className="form-control" id="notesInputLabel" defaultValue={this.props.job.notes} onChange={(event)=>this.handleInput(event,"notes")}rows="3"></textarea>
                            :
                            <div>{this.props.job.notes}</div>
                          }
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="card-footer d-flex justify-content-end" style={styles.modalHeaderFooter}>
                    {this.state.editmode?
                      <button type="button" className="btn btn-primary mr-3" onClick={()=>this.onSave()}>Save</button>
                    :
                    <button type="button" className="btn btn-secondary mr-3"  onClick={()=>this.onEdit()}>Edit</button>
                    }
                    {this.state.editmode?
                    <button type="button" className="btn btn-secondary" onClick={()=>this.onEdit()}>Cancel</button>
                    :
                    <button type="button" className="btn btn-secondary" onClick={()=>this.props.close()}>Close</button>
                    }
                  </div>
                </div>
            }

        </CSSTransitionGroup>
        </div>

    );
  }
}

export default JobModal;