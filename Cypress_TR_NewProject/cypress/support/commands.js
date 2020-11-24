// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import 'cypress-file-upload';
import addContext from 'mochawesome/addContext';
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
Cypress.Commands.add("buttonInvoke", (elementBtn, nameBtn) => {
    cy.get(elementBtn).each(($Btn, Index, $list) => {
        if( $Btn.text().includes(nameBtn) ) {
            cy.get(elementBtn).eq(Index).click();
        } 
    });    
});

Cypress.Commands.add("uploadAudioMp3File", (audioPath, audioElm) => {
    cy.fixture(audioPath, 'binary')
        .then(Cypress.Blob.binaryStringToBlob)
        .then(fileContent => {
            cy.get(audioElm).attachFile({
                fileContent,
                fileName: audioPath,
                mimeType: 'video/mp3',
                encoding: 'utf8'
            })
        });
});




Cypress.Commands.add("testcaseFailedScreenshot", function() {
    Cypress.on('test:after:run', (test, runnable) => {
        if (test.state === 'failed') {
            addContext({test}, { title: "Screenshot", value:`../../../cypress/screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png` });
        }
    });
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.overwrite('log', (subject, message) => cy.task('log', message));
