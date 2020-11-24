class PlanPage {

    getUploadMediaDialogName() {
        return '.MuiPaper-root[role="dialog"] #form-dialog-title h2';
    }
    
    getAudioInputButton() {
        return '.file-drop-target input[type="file"]';
    }

    getUploadBtn() {
        return '.MuiDialogActions-root button > span';
    }

    getPlayBtn() {
        return 'button[title="Play / Pause"]';
    }

    getUploadText(){
        return '.MuiDialogContent-root .MuiList-root > li > .MuiListItemText-root span';
    }

    getUploadTick(){
        return '.MuiListItemAvatar-root .MuiAvatar-circle > svg > path';
    }

    getSnackBarUpload() {
        return cy.get('.MuiSnackbarContent-root .MuiSnackbarContent-message span', {timeout: 400000} );
    }

    getSnackBarMsg() {
        return cy.get('.MuiSnackbarContent-root .MuiSnackbarContent-message span');
    }
    getBookCell() {
        return 'table.data-grid > tbody tr > td.book.setp.cell';
    }

    getBookReferenceCell() {
        return 'input[class="data-editor"]';
    }

    getSaveBtn() {
        return 'button[aria-label="Save"]'; 
    }

    getTranscribeBtn() {
        return '.MuiPaper-root button span.MuiButton-label';
    }

    getAddsectionBtn() {
        return '.MuiPaper-root button span.MuiButton-label';
    }

    getBusySnackbar() {
        return '.MuiSnackbarContent-root .MuiSnackbarContent-message span';
    }

    getBusyCircle() {
        return '.MuiToolbar-root div > img[alt="busy"]';
    }

    getAudioUploadLabel() {
        return cy.get('.file-drop-target label');
    }

    getBookName() {
        return cy.get('.data-grid tbody tr:nth-child(2) td');
    }

    getSelectBookName() {
        return cy.get('.data-grid tbody tr:nth-child(3) td');
    }
    
    getBookReferenceBox() {
        return cy.get('.data-grid tbody tr:nth-child(3) td.book.pass.cell');
    }
}

export default PlanPage;