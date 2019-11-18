import React, { Component } from 'react';
import {Link, Redirect} from "react-router-dom";
import {MDBRow, MDBCol, MDBCard, MDBCardBody, MDBMask, MDBIcon, MDBView, MDBBtn } from "mdbreact";
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { getGoogleBook, getGoogleSearch } from '../google.js';

class Book_UI extends Component {
	constructor () {
		super();
		this.state = {   
            id: "",
            
			title: 'BOOK TITLE',
            subtitle: '',
			author: 'BOOK AUTHOR',
			genre: 'BOOK GENRE',
			summary: 'This is the book sumary... blah blah blah...',
            artwork: "https://via.placeholder.com/500",

		};
	}

	render() {
		return (

			<>


				<Navbar bg="dark" variant="dark">
				<LinkContainer to="/homepage">
				<Navbar.Brand href="#home">TightReads</Navbar.Brand>
				</LinkContainer>
				<Nav className="mr-auto">
					<LinkContainer to="/homepage">
					<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/">
					<Nav.Link>Login</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/makeaccounts">
					<Nav.Link>Sign Up</Nav.Link>
					</LinkContainer>            
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search Books" className="mr-sm-2" />
					<Button variant="outline-light">Search</Button>
				</Form>
				</Navbar>

				<br/>

				<div class="container">




					<div class="row">
						<div class="col-sm-4">
							<img src={this.state.artwork} alt='book image' width={350} height={500} mode='fit'/>
						</div>

						<div class="col-sm-8">
							<h1>
								<strong>{this.state.title} </strong>
								<br/>{this.state.subtitle}
							</h1>
							<h5>
								<b>Author: </b> {this.state.author} 
							</h5>
							<h5>
								<b>Genre: </b> {this.state.genre} 
							</h5>
							<h5>
								<b>Summary:</b> 
							</h5>
							<p>
								{this.state.summary} 
							</p>
							
						</div>
					</div>
				</div>
			</>
		);
	}
    
    componentDidMount() {
	    var id;
	    if(this.props.location.state.id != null){
	        id = this.props.location.state.id;
        }else {
            id = "HestSXO362YC";//this.props.match.params;
        }

        this.setState({
            id: id,
        });
        getGoogleBook(id).then(data => {
            console.log(data)
            this.setState({
                title: (data.volumeInfo.title) ? data.volumeInfo.title : '',
                subtitle: (data.volumeInfo.subtitle) ? data.volumeInfo.subtitle : '',
                author: (data.volumeInfo.authors) ? data.volumeInfo.authors[0] : '',
                genre: (data.volumeInfo.categories) ? data.volumeInfo.categories[0]  : '',
                summary: (data.volumeInfo.description) ? data.volumeInfo.description : '',
                artwork: (data.volumeInfo.imageLinks) ? data.volumeInfo.imageLinks.thumbnail : '',
            });
        });
    }
}

export default Book_UI;
