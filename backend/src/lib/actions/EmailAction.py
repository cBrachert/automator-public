
import os
import httplib2
import oauth2client
import base64
from apiclient import errors, discovery
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

CREDENTIAL_PATH = os.path.normpath(os.path.join(os.path.dirname(os.path.realpath(__file__)), 'gmail-credentials.json'))
print(CREDENTIAL_PATH)

class EmailAction(object):

    def __init__(self, title, description, recipient, cc, subject, message):
        self.title = title
        self.description = description
        self.recipient = recipient
        self.cc = cc
        self.subject = subject
        self.message = message


    def get_credentials(self):
        if not os.path.exists(CREDENTIAL_PATH):
            print('no credentials found')
            return None
        return oauth2client.file.Storage(CREDENTIAL_PATH).get()
    

    def SendMessage(self):
        credentials = self.get_credentials()
        if credentials is None:
            return
        service = discovery.build('gmail', 'v1', http=credentials.authorize(httplib2.Http()))
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = self.subject
        msg['From'] = "automator.testmail@gmail.com"
        msg['To'] = self.recipient
        if self.cc is not None:
            msg['Cc'] = self.cc
        msg.attach(MIMEText(self.message, 'plain'))

        message = {'raw': base64.urlsafe_b64encode(msg.as_string())}
        return(service.users().messages().send(userId="me", body=message).execute())
    
    def run(self):
        self.SendMessage()

    def serialize(self):
        return {
            "op": "mail",
            "recipient": self.recipient,
            "cc": self.cc,
            "subject": self.subject,
            "message": self.message,
            "title": self.title,
            "description": self.description
        }
    
    @staticmethod
    def from_JSON(data):
        try:
            cc = data["cc"]
        except KeyError:
            cc = None
        return EmailAction(data['title'], data['description'], data["recipient"], cc, data["subject"], data["message"])
