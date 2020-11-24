//// <reference types="cypress" />

import LoginPage from '../../support/pageobjects/login.po'
import { TeamPage, NewProject, DeleteTeam } from '../../support/pageobjects/team.po'
import PlanPage from '../../support/pageobjects/plan.po'
import WorkPage from '../../support/pageobjects/work.po'

describe('NEW PROJECT Scripture Transcription Hierarchy', function() {
    const loginPage = new LoginPage();
    const teamPage = new TeamPage();
    const newProject = new NewProject();
    const planPage = new PlanPage();
    const workPage = new WorkPage();
    const deleteTeam = new DeleteTeam();
    let failedTest = null;

    before(function() {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.fixture('truserdata')
            .then( (testdata) => {
            this.testdata = testdata;
        });
    });

    beforeEach(function () {
        if (failedTest == 'failed') {
            loginPage.logoutTNPage();
            Cypress.runner.stop();
        }
    });

    afterEach( function() {
        cy.testcaseFailedScreenshot();
        if (this.currentTest.state === 'failed') {
            cy.wait(2000);
            // loginPage.logoutTNPage();
            failedTest = this.currentTest.state;
        }
    });

    after(function() {
        loginPage.logoutTNPage();
    });

    it('User login', function() {
                
        // Transcriber login
        cy.visit('/');
        loginPage.nonSocialLogin(this.testdata.tnEmail1, this.testdata.tnPassword1);
        cy.url().should('include', Cypress.env("loadingPage"));
        cy.url().should('contains', Cypress.env("loadingPage"));
        cy.location('href', {timeout: 60000}).should('include', Cypress.env("teamPage"));
        cy.wait(1000);
        
        cy.url().should('eq', Cypress.config().baseUrl + Cypress.env("teamPage"));
        deleteTeam.checkProjectDeleteTeam();
        cy.log('User login...');
    });
    
    it('Add a Team on team page', function() {
        teamPage.getAddTeamButton().click();
        teamPage.getAddTeamDialog().should('be.visible', 'Add Team');
        teamPage.getTeamNameTextBox().type('Test Team');
        cy.buttonInvoke(teamPage.getAddButton(), 'Add')
        teamPage.getProgressBar().should('not.be.visible');
        teamPage.getProgressBar().should('not.exist');
        teamPage.getAddedTeam().should('be.visible');
        teamPage.getAddedTeam().should('contain','Test Team');
        cy.log('Add a Team on team page');
    });

    it('Add a new project on team page', function() {
        teamPage.getProgressBar().should('not.be.visible');
        teamPage.getProgressBar().should('not.exist');
        newProject.getPlusButton().click();
        cy.get(newProject.getNewProjectBtn()).should('be.visible');
        cy.buttonInvoke(newProject.getNewProjectBtn(), 'New Project');
        newProject.getNewProjectDialogName().should('contain', 'New Project');
        newProject.getProjectNameTxtBox().type('Project One')
        newProject.getLanguageBtn();

        newProject.getLanguageDialogName().should('contain.text', 'Choose Language Details');
        newProject.getLanguageIdBox().type('seh');
        cy.buttonInvoke(newProject.getLanguageId(), 'seh');
        cy.buttonInvoke(newProject.getSaveBtn(), 'Save');
        cy.buttonInvoke(newProject.getAddBtn(), 'Add');
        cy.wait(5000);
        newProject.getProjectNameCard().should('be.visible'); 
        newProject.getProjectNameSection().last().should('be.visible');
        newProject.getProjectNameCard().click();
        cy.log('Add a new project on team page');
    });

    it('Add Sections and Passages on plan page', function() {
        cy.url().should('include', Cypress.env("planPage"));
        cy.get(planPage.getBusyCircle(), {timeout: 50000} ).should('not.exist');
        cy.buttonInvoke(planPage.getAddsectionBtn(), 'Add Section'); 

        planPage.getBookName().each(($elmrow1, Index1, list1) => {
            if($elmrow1.text().includes('1')) {
                planPage.getBookName().eq(Index1).next().trigger('click').type('LukeBook{enter}');
            }
        });

        planPage.getSelectBookName().each(($elmrow1, Index1, list1) => {
            if($elmrow1.text().includes('1')) {
                planPage.getSelectBookName().eq(Index1).next().trigger('click').type('Luke{enter}');
            } 
        });   
        planPage.getBookReferenceBox().should('be.visible');
        planPage.getBookReferenceBox().next().trigger('dblclick').find('input').type('1:1-5{enter}');

        planPage.getSelectBookName().find('span button[title="Upload Media"]').click();
        planPage.getSnackBarUpload().should('be.visible');
        planPage.getSnackBarUpload().should('not.be.visible');
        cy.get(planPage.getUploadMediaDialogName(), {timeout: 9000}).should('contain', 'Upload Media');
        cy.uploadAudioMp3File('audio/42_luke.mp3', planPage.getAudioInputButton());
        
        planPage.getAudioUploadLabel().should('contain.text', 'audio/42_luke.mp3');
        cy.buttonInvoke(planPage.getUploadBtn(), 'Upload');
        cy.wait(1000);
        cy.get(planPage.getUploadMediaDialogName()).should('not.be.visible');

        planPage.getSnackBarUpload().should('be.visible');
        planPage.getSnackBarUpload().should('not.be.visible');
        cy.wait(1000); 
        
        cy.get(planPage.getTranscribeBtn()).contains('Transcribe').should('contain.text', 'Transcribe').click();
        cy.get(planPage.getBusySnackbar(), {timeout: 30000}).should('not.be.visible');
        cy.url().should('include', Cypress.env("workPage"));

    });

    it('Verify a task on the work page', function() {

        workPage.getSelectTask().click();
        cy.buttonInvoke(workPage.getAudiobutton(), 'ESC').should('be.visible');
        cy.wait(2000); //delay for audio playing 
        cy.get(workPage.getAudioProgress(), {timeout: 80000}).should('be.visible');
        
        cy.get(workPage.getAudioPlayDuration()).first().should('not.contain', '0:00');
        cy.get(workPage.getAudioPlayDuration(), {timeout: 30000}).last().should('contain', '2');
        cy.buttonInvoke(workPage.getAudiobutton(), 'ESC').should('be.visible');
        workPage.getTranscribeTextarea().click().type('Abisa hikikirum i sabuw iyab iti sawar matar');

        cy.get(workPage.getStateLabel(), {timeout: 30000}).should('contain.text', 'Transcribing');
        cy.get(workPage.getSubmitbutton()).click({force: true});
        cy.get(workPage.getStateLabel(), {timeout: 30000}).should('contain.text', 'Review');

        // Reviewing the audio.
        cy.buttonInvoke(workPage.getAudiobutton(), 'ESC').should('be.visible');
        cy.wait(4000); //delay for audio playing
        cy.get(workPage.getAudioProgress(), {timeout: 50000}).should('be.visible');
        cy.get(workPage.getAudioPlayDuration()).first().should('not.contain', '0:00');
        cy.buttonInvoke(workPage.getAudiobutton(), 'ESC').should('be.visible');
        workPage.getTranscribeTextarea().click().type(' Review done');
        cy.get(workPage.getStateLabel(), {timeout: 50000}).should('contain.text', 'Reviewing');

        cy.buttonInvoke(workPage.getSubmitbutton1(), 'Submit');
        cy.get(workPage.getStateLabel(), {timeout: 20000}).should('contain.text', 'Ready to Sync');

    });

    it('Ready to sync and PT integration', function() {
        
        workPage.getThreeDotEllipsisBtn().click();
        cy.buttonInvoke(workPage.getPTIntegrationBtn(), 'Paratext Integration');
        workPage.getPTIntegrationDialog().should('be.visible').should('contain.text', 'Project One Integrations');

        cy.get(workPage.getPTDialogQuestion()).each(($elmQues, Index, list) => {
            if($elmQues.text().includes('Passages ready to sync')) {
                cy.get(workPage.getPTDialogQuestion()).eq(Index).next().contains('1', {timeout: 30000}).should('contain.text', '1');
            }
        });
        // dropdown project list
        cy.get(workPage.getInvokeProjectListBox()).first().should('be.visible').click();
        cy.get(workPage.getProjectListBox()).last().should('contain', 'Remove Project');
        
        cy.wait(10000); // delay for project list to appear.
        cy.get(workPage.getProjectListBox()).each(($elmQues, Index, list) => {
            if($elmQues.text().includes('SenaDevelop (seh-seh)')) {
                cy.get(workPage.getProjectListBox(), {timeout: 50000}).eq(Index).should('be.visible').click();
                cy.wait(2000);
            }
        });
        
        // Sync enabled
        cy.get(workPage.getSyncButton()).first().should('be.visible').click();
        planPage.getSnackBarUpload().should('contain', 'Syncing');
        planPage.getSnackBarUpload().should('contain', 'Sync Complete');
        planPage.getSnackBarUpload().should('not.be.visible');
        
        cy.get(workPage.getPTDialogQuestion()).each(($elmQues, Index, list) => {
            if($elmQues.text().includes('Passages ready to sync')) {
                cy.get(workPage.getPTDialogQuestion()).eq(Index).next().should('contain.text', '0');
            }
        });

        cy.get(workPage.getPTDialogClose()).click();
        workPage.getPTIntegrationDialog().should('not.be.visible');
        cy.reload();
        cy.url().should('include', Cypress.env("loadingPage"));
        cy.location('href', {timeout: 60000}).should('include', Cypress.env("teamPage"));
        newProject.getProjectNameCard().click();
        cy.location('href', {timeout: 60000}).should('include', Cypress.env("planPage"));
        cy.wait(2000);
        cy.buttonInvoke(planPage.getTranscribeBtn(), 'Transcribe');
        
        const rootElm = cy.get('#root');
        rootElm.then((rootElm) => {
            if(rootElm.find(planPage.getBusySnackbar()).length == 1 ) {
                planPage.getSnackBarUpload().should('be.visible');
                planPage.getSnackBarUpload().should('not.be.visible');
                cy.buttonInvoke(planPage.getTranscribeBtn(), 'Transcribe');
            }else {
                cy.get(planPage.getTranscribeBtn()).contains('Transcribe').should('not.be.visible');
            }
        });
        cy.location('href', {timeout: 60000}).should('include', Cypress.env("workPage"));
        cy.get(workPage.getStateLabel(), {timeout : 60000}).should('contain.text', 'Done');
    });
    

});



