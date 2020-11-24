class WorkPage {
    getSelectTask() {
        return cy.get('.MuiListItemText-root.MuiListItemText-multiline p');
    }

    getAudiobutton() {
        return '.MuiGrid-root span button span p';
    }

    getPausebutton() {
        return '.MuiGrid-root span[title="Pause (ESC)"] button span svg';
    }

    getAudioPlayDuration() {
        return '.MuiGrid-root p time';
    }

    getTranscribeTextarea() {
        return cy.get('.MuiGrid-root.MuiGrid-container.MuiGrid-item > textarea[rows="1"]');
    }

    getStateLabel() {
        return '.MuiChip-root.MuiChip-sizeSmall span';
    }

    getSubmitbutton() {
        return '.MuiGrid-root.MuiGrid-container span[title="Submit as complete"] button span.MuiTouchRipple-root';
    }

    getSubmitbutton1() {
        return '.MuiGrid-root.MuiGrid-container span button span.MuiButton-label';
    }

    getThreeDotEllipsisBtn() {
        return cy.get('#TaskTable div h6').nextAll().find('button span svg');
    }

    getPTIntegrationBtn() {
        return '#customized-menu ul.MuiList-root li.MuiListItem-button div span.MuiTypography-displayBlock';
    }

    getPTIntegrationDialog() {
        return cy.get('div #form-dialog-title h2 div');
    }

    getPTDialogQuestion() {
        return '#Paratext .MuiAccordionDetails-root li.MuiListItem-root div.MuiListItemText-root span.MuiTypography-root';
    }

    getProjectListBox() {
        return '.MuiPaper-root ul.MuiMenu-list[role="listbox"] li.MuiListItem-button';
    }

    getInvokeProjectListBox() {
        return '.MuiInputBase-root #select-project';
    }

    getSyncButton() {
        return '.MuiFormGroup-root button span';
    }

    getPTDialogClose() {
        return '#form-dialog-title h2 div button';
    }

    getHomeIcon() {
        return cy.get('header button.MuiButtonBase-root');
    }

    getAudioProgress() {
        return '.MuiLinearProgress-root[aria-valuenow="9"]';
    }
}

export default WorkPage;
