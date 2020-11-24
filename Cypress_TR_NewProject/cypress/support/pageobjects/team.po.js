class TeamPage {

    getAddTeamButton() {
        return cy.get('#TeamScreen button'); 
    }

    getAddTeamDialog() {
           return cy.get('div[role="dialog"] #form-dialog-title h2');
    }

    getTeamNameTextBox() {
        return cy.get('.MuiDialogContent-root input[id="name"].MuiInputBase-input');
    }

    getAddButton() {
        return '.MuiDialogActions-root button';
    }
    getAddedTeam() {
        return cy.get('#TeamItem h5');
    }
    getProgressBar() {
        return cy.get('.MuiLinearProgress-root[role="progressbar"]', {timeout:50000})
    }
};

class NewProject {
    getPlusButton() {
        return cy.get('#TeamItem .MuiGrid-root .MuiCardContent-root svg', {timeout: 50000});
    }
    
    getNewProjectBtn() {
        return '#TeamItem .MuiGrid-root .MuiCardContent-root button span.MuiButton-label';
    }

    getNewProjectDialogName() {
        return cy.get('.MuiPaper-root[role="dialog"] #add-project-dialog-title h2');
    }

    getProjectNameTxtBox() {
        return cy.get('.MuiDialogContent-root .MuiTextField-root input[id="name"]');
    }
    
    getLanguageBtn() {
        cy.get('.MuiFormGroup-root .MuiTextField-root').should('contain.text', 'Language').each(($Btnlabel, Index, list) => {
            if($Btnlabel.text().includes('Language')){
                $Btnlabel.find('div input[type="text"]').eq(Index).trigger('focus');
                $Btnlabel.find('div input[type="text"]').eq(Index).trigger('click');
            }
        });
    }

    getLanguageDialogName() {
        return cy.get('div[role="dialog"] #form-dialog-title h2');
    }

    getLanguageIdBox() {
        return cy.get('.MuiDialogContent-root.MuiDialogContent-dividers input[id="language"]');
    }

    getLanguageId() {
        return '.MuiButtonBase-root[role="button"] .MuiListItemText-root span > div > p.MuiTypography-root';
    }

    getSaveBtn() {
        return '.MuiDialogActions-root button > span > p';
    }

    getAddBtn() {
        return '.MuiDialogActions-root button > span';
    }

    getProjectNameCard() {
        return cy.get('.MuiPaper-root .MuiCardContent-root h2');
    }
    
    getProjectNameSection() {
        return cy.get('.MuiPaper-root .MuiCardContent-root p');
    }
};

class DeleteTeam {
    getSettingsBtn() {
        return cy.get('div #TeamItem button.MuiButton-contained span.MuiButton-label');
    }

    getTeamDialogName() {
        return cy.get('.MuiPaper-root #form-dialog-title h2');
    }

    getAdvanceBtn() {
        return cy.get('.MuiAccordion-root .MuiAccordionSummary-root div p');
    }

    getDeleteBtn() {
        return cy.get('.MuiAccordionDetails-root .MuiFormGroup-root button span.MuiButton-label');
    }

    getAlertDialogName() {
        return cy.get('.MuiPaper-root.MuiDialog-paper #alert-dialog-title h2');
    }

    getYesBtn() {
        return '.MuiPaper-root.MuiDialog-paper div.MuiDialogActions-root .MuiButtonBase-root span.MuiButton-label';
    }

    checkProjectDeleteTeam() {
        const teamname = cy.get('#TeamScreen .MuiGrid-root.MuiGrid-container');
        teamname.then((NameElm) => {
            if(NameElm.find('#TeamItem div h5').length == 1){
                this.getSettingsBtn().last().click();
                this.getTeamDialogName().should('contain', 'Team Settings');
                this.getAdvanceBtn().click();
                this.getDeleteBtn().click();
                this.getAlertDialogName().should('contain.text', 'Confirmation');
                cy.buttonInvoke(this.getYesBtn(), 'Yes');
                this.getAlertDialogName().should('not.be.visible');
            } else {
                cy.log('Team does not available in the user. so, It is going to create.');
            }
        })
    }
};

export default {
     TeamPage,
     NewProject,
     DeleteTeam
};
