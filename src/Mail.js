import {$http} from 'xhr';

export const $Mail = {
  getAllFolders: function() {
    return $http.get('http://localhost:8080/api/folder');
  },
  getMailsInFolder: function(folder) {
    return $http.get('http://localhost:8080/api/folder/'+folder);
  },
  deleteFolder: function(folder) {
    return $http.delete('http://localhost:8080/api/folder/'+folder);
  },
  renameFolder: function(folder, newName) {
    return $http.put('http://localhost:8080/api/folder/' + folder, {newval: newName});
  },
  deleteMail: function (mail) {
    return $http.delete('http://localhost:8080/api/msg/' + mail._id);
  },
  moveMail: function (mail, newName) {
    return $http.put('http://localhost:8080/api/msg/'+mail._id, {folder: newName});
  },
  newMail: function (mail) {
    var recipients = mail.rec.split(';');
    var paras = {sender: mail.sender, recipients: recipients, text: mail.text,subject: mail.subject,date: mail.date, folder:mail.folder};
    console.log(paras);
    return $http.post('http://localhost:8080/api/msg', paras);
  }
}
