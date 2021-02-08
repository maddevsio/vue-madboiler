import { mount } from '@cypress/vue';
import UIButton from '@/components/ui/UIButton';

describe('UIButton', () => {
  it('renders the slot name passed in', () => {
    mount(UIButton, {
      slots: {
        default: 'Button name'
      }
    });

    cy.get('.ui-button').should('contain', 'Button name');
  });
});
