import React from "react";
import { FormApi } from "final-form";
import { Form } from "react-final-form";
import arrayMutators from "final-form-arrays";
import InputField from "components/Field";
import { FieldArray } from "react-final-form-arrays";
import Button from "components/Button";

const formFields = [
  { name: 'question', label: 'question', required: true },
  { name: 'type', label: 'question type', placeholder: 'YON, MCQ, ...', required: true },
  { name: 'correct_answer', label: 'correct answer', placeholder: 'index of correct answer' },
  { name: 'answers', label: 'answers', placeholder: 'comma separated values' },
];

const KitForm = (props: { onSubmit: (values: any, form: FormApi) => void }) => {
  return (
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={(values, form) => props.onSubmit(values, form)}
      render={({ handleSubmit, pristine, submitErrors, form: { mutators: { push, pop } } }) => (
        <form onSubmit={handleSubmit} className='border p-3 rounded-3'>
          <h3 className='text-center'>Add new kit</h3>
          {submitErrors && <p className='alert alert-danger'>{submitErrors.kitError}</p>}
          <InputField type='text' name='title' required label='title'/>
          <FieldArray name='questions'>
            {({ fields }) => (
              fields.map(name => (
                <div key={name} className='border-bottom mb-3 pb-3'>
                  {formFields.map(field => (
                    <InputField
                      key={field.name}
                      type='text'
                      name={`${name}.${field.name}`}
                      required={field.required}
                      label={field.label}
                      placeholder={field.placeholder}
                    />
                  ))}
                  <Button
                    title='Delete'
                    className='btn-danger'
                    onClick={() => pop('questions')}
                  />
                </div>
              ))
            )}
          </FieldArray>
          <Button
            className='btn-primary mb-3'
            title='+ Add question'
            onClick={() => push('questions', undefined)}
          />
          <Button
            type='submit'
            title='submit'
            className='btn-primary col-12'
            disabled={pristine}
          />
        </form>
      )}
    />
  );
}

export default KitForm;