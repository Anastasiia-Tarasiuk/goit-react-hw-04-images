import React from "react";
import { Formik } from "formik";
import { Header, SearchFormButton, Icon, SearchForm, SearchFormInput } from "./Searchbar.styled";


export const Searchbar = ({onSubmit}) => {

   function handleSubmit(values, actions) {
        onSubmit(values.inputText.trim());
        actions.resetForm();  
    } 
    
    return (
        <Header>
            <Formik
                initialValues={{ inputText: '' }}
                onSubmit={handleSubmit}
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
