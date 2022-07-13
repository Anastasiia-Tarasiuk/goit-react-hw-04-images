import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
// import { Header } from "./Searchbar.styled";

export class Searchbar extends Component {

    handleSubmit = (values, actions) => {
        this.props.onSubmit(values.inputText);
        actions.resetForm();        
    } 

    render() {
        return (
            <header>
                <Formik
                    initialValues={{ inputText: '' }}
                    onSubmit={this.handleSubmit}
                >
                    <Form className="form">
                        <button type="submit" className="button">
                            <span className="button-label">Search</span>
                        </button>

                        <Field 
                            name="inputText"
                            className="input"
                            type="text"
                            // autocomplete="off"
                            // autofocus
                            placeholder="Search images and photos"
                        />
                    </Form>
                </Formik>
            </header>
        )
    }
}
