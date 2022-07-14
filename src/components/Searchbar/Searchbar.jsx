import React, { Component } from "react";
import { Formik } from "formik";
import { Header, SearchFormButton, Icon, SearchForm, SearchFormInput } from "./Searchbar.styled";

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
                    <SearchForm>
                        <SearchFormButton type="submit">
                            <Icon/>
                        </SearchFormButton>

                        <SearchFormInput
                            name="inputText"
                            className="input"
                            type="text"
                            placeholder="Search images and photos"
                        />
                    </SearchForm>
                </Formik>
            </Header>
        )
    }
}
