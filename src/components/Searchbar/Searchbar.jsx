import React, { Component } from "react";
import { Formik, Form, Field } from "formik";
import { Header, SearchFormButton, SearchFormButtonLabel } from "./Searchbar.styled";

export class Searchbar extends Component {

    handleSubmit = (values, actions) => {
        this.props.onSubmit(values.inputText);
        actions.resetForm();        
    } 

    render() {
        return (
            <Header>
                <Formik
                    initialValues={{ inputText: '' }}
                    onSubmit={this.handleSubmit}
                >
                    <Form>
                        <SearchFormButton type="submit">
                            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
                        </SearchFormButton>

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
            </Header>
        )
    }
}
