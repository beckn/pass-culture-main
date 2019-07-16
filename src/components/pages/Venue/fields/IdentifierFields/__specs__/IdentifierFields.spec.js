import { shallow } from 'enzyme'
import React from 'react'
import IdentifierFields from '../IdentifierFields'
import TextareaField from '../../../../../layout/form/fields/TextareaField'
import TextField from '../../../../../layout/form/fields/TextField'

describe('src | components | pages | Venue | fields | IdentifierFields', () => {
  let props

  beforeEach(() => {
    props = {
      fieldReadOnlyBecauseFrozenFormSiret: true,
      formSiret: 'form siret',
      initialSiret: 'form siret',
      isCreatedEntity: true,
      isModifiedEntity: true,
      readOnly: true,
    }
  })

  describe('snapshot', () => {
    it('should match snapshot', () => {
      // when
      const wrapper = shallow(<IdentifierFields {...props} />)

      // then
      expect(wrapper).toBeDefined()
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('render', () => {
    it('should display four TextField and one TextAreaField components with the right props', () => {
      // given
      const props = {
        fieldReadOnlyBecauseFrozenFormSiret: false,
        initialSiret: null,
        isCreatedEntity: true,
        isModifiedEntity: true,
        readOnly: false,
      }

      // when
      const wrapper = shallow(<IdentifierFields {...props} />)

      // then
      const textFields = wrapper.find(TextField)
      expect(textFields).toHaveLength(4)

      const textareaField = wrapper.find(TextareaField)
      expect(textareaField).toHaveLength(1)

      expect(textFields.at(0).prop('name')).toBe('siret')
      expect(textFields.at(0).prop('required')).toBe(false)

      expect(textFields.at(1).prop('label')).toBe('Nom : ')
      expect(textFields.at(1).prop('name')).toBe('name')
      expect(textFields.at(1).prop('required')).toBe(true)

      expect(textFields.at(2).prop('label')).toBe('Nom d’usage : ')
      expect(textFields.at(2).prop('name')).toBe('publicName')
      expect(textFields.at(2).prop('required')).toBe(false)

      expect(textFields.at(3).prop('label')).toBe('E-mail : ')
      expect(textFields.at(3).prop('name')).toBe('bookingEmail')
      expect(textFields.at(3).prop('required')).toBe(true)

      expect(textareaField.at(0).prop('label')).toBe('Commentaire (si pas de SIRET) : ')
      expect(textareaField.at(0).prop('name')).toBe('comment')
    })

    describe('siret text field', () => {
      it('siret TextField can be edited when mode is not readOnly and there is no initial siret', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          initialSiret: null,
          readOnly: false,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(0).prop('name')).toBe('siret')
        expect(textFields.at(0).prop('readOnly')).toBe(false)
      })

      it('siret TextField cannot be edited when mode is read only', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(0).prop('name')).toBe('siret')
        expect(textFields.at(0).prop('readOnly')).toBe(true)
      })

      it('proper siret label is returned when isCreatedEntity is true', () => {
        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const label = wrapper
          .find('label')
          .at(0)
          .text()
        expect(label).toBe('SIRET du lieu qui accueille vos offres (si applicable) : ')
      })

      it('proper siret label is returned when isCreatedEntity is false', () => {
        // given
        const props = {
          isCreatedEntity: false,
          isModifiedEntity: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const label = wrapper
          .find('label')
          .at(0)
          .text()
        expect(label).toBe('SIRET : ')
      })
    })

    describe('name text field', () => {
      it('name TextField can be edited when mode is not readOnly and fieldReadOnlyBecauseFrozenFormSiretdisplay is false', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          fieldReadOnlyBecauseFrozenFormSiret: false,
          readOnly: false,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(1).prop('name')).toBe('name')
        expect(textFields.at(1).prop('readOnly')).toBe(false)
      })

      it('name TextField cannot be edited when mode is read only', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(1).prop('name')).toBe('name')
        expect(textFields.at(1).prop('readOnly')).toBe(true)
      })

      it('name TextField cannot be edited when fieldReadOnlyBecauseFrozenFormSiretdisplay is tue', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          fieldReadOnlyBecauseFrozenFormSiretdisplay: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(1).prop('name')).toBe('name')
        expect(textFields.at(1).prop('readOnly')).toBe(true)
      })
    })

    describe('publicName text field', () => {
      it('publicName TextField can be edited when mode is not readOnly', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          fieldReadOnlyBecauseFrozenFormSiret: false,
          readOnly: false,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(2).prop('name')).toBe('publicName')
        expect(textFields.at(2).prop('readOnly')).toBe(false)
      })

      it('publicName TextField cannot be edited when mode is read only', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(2).prop('name')).toBe('publicName')
        expect(textFields.at(2).prop('readOnly')).toBe(true)
      })
    })

    describe('email text field', () => {
      it('email TextField can be edited when mode is not readOnly', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          fieldReadOnlyBecauseFrozenFormSiret: false,
          readOnly: false,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(3).prop('name')).toBe('bookingEmail')
        expect(textFields.at(3).prop('readOnly')).toBe(false)
      })

      it('email TextField cannot be edited when mode is read only', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textFields = wrapper.find(TextField)
        expect(textFields.at(3).prop('name')).toBe('bookingEmail')
        expect(textFields.at(3).prop('readOnly')).toBe(true)
      })
    })

    describe('comment text area field', () => {
      it('comment text area field can be edited when mode is not readOnly', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: false,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textareaField = wrapper.find(TextareaField)
        expect(textareaField.at(0).prop('name')).toBe('comment')
        expect(textareaField.at(0).prop('readOnly')).toBe(false)
      })

      it('comment text area field cannot be edited when mode is read only', () => {
        // given
        const props = {
          isCreatedEntity: true,
          isModifiedEntity: true,
          readOnly: true,
        }

        // when
        const wrapper = shallow(<IdentifierFields {...props} />)

        // then
        const textareaField = wrapper.find(TextareaField)
        expect(textareaField.at(0).prop('name')).toBe('comment')
        expect(textareaField.at(0).prop('readOnly')).toBe(true)
      })
    })
  })
})
