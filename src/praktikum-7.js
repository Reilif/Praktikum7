import {ComponentAnnotation as Component, ViewAnnotation as View, NgFor} from 'angular2/angular2';
import {$Mail} from 'Mail';


@Component({
  selector: 'praktikum-7'
})

@View({
  templateUrl: 'praktikum-7.html',
  directives: [NgFor]
})

export class Praktikum7 {

  constructor() {
    console.info('Magic happens');
    this.folders = [];
    this.mails = [];
    this.selectedFolder = null;
    this.selectedMail = {subject: null, date: null, text: null, sender: null};

    $Mail.getAllFolders().then((data) => {
      this.folders = data;
      console.log(this.folders);
    });

  }

  selectFolder(folder) {
    console.log(folder);
    this.selectedFolder = folder;

    if (folder != null) {

      $Mail.getMailsInFolder(folder).then((data => {
        this.mails = data;
        console.log(this.mails);
      }));
    }
  }

  renameFolder(folder) {
    var newName = prompt("Geben Sie einen neuen namen für den Ordner ein:", folder);

    if (folder && newName) {

      $Mail.renameFolder(folder, newName).then((data => {
        var i = this.folders.indexOf(folder);
        this.folders[i] = newName;
      }));
    }
  }

  moveMail(mail) {
    var newName = prompt("Geben Sie einen Ordner ein, in den die Mail geschoben werden soll:", this.selectedFolder);

    if (mail && newName) {

      $Mail.moveMail(mail, newName).then((data => {
        this.selectFolder(newName);
      }));
    }
  }

  newMail() {
    var newMail = {};
    newMail.folder = prompt("Geben Sie einen Ordner ein, in den die Mail geschoben werden soll:", this.selectedFolder);
    newMail.subject = prompt("Geben Sie einen Betreff ein:");
    newMail.sender = prompt("Geben Sie einen Sender ein:");
    newMail.rec = prompt("Geben Sie Empfänger ein mit ; :");
    newMail.text = prompt("Geben Sie Text ein:");
    newMail.date = new Date();

    $Mail.newMail(newMail).then((data => {
      if (this.selectedFolder == folder) {
        this.mails.push(data);
      }
    }));
  }

  deleteFolder(folder) {
    var newName = confirm("Wollen Sie den Ordner " + folder + " wirklich löschen?");

    if (folder && newName) {

      $Mail.deleteFolder(folder).then((data => {
        console.log("Lösche Ordner " + folder);
        var i = this.folders.indexOf(folder);
        this.folders = this.folders.slice(i);
      }));
    }
  }

  selectMail(mail) {
    console.info(mail.subject);
    this.selectedMail = mail;
  }

  deleteMail(mail) {
    var newName = confirm("Wollen Sie den Ordner " + mail.subject + " wirklich löschen?");

    if (mail && newName) {

      $Mail.deleteMail(mail).then((data => {
        console.log("Lösche Mail " + mail.subject);
        var index = this.mails.indexOf(mail);
        this.mails = this.mails.slice(index);
      }));
    }
  }
}
