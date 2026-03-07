from fastapi import APIRouter, HTTPException, BackgroundTasks
from pydantic import BaseModel
from database import coaches_col
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter(prefix="/api/contact", tags=["contact"])

class ContactMessage(BaseModel):
    nom: str
    email: str
    message: str

def send_email_sync(recipient: str, subject: str, body: str, reply_to: str):
    smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    sender_email = os.getenv("SENDER_EMAIL")

    if not smtp_username or not smtp_password:
        print("SMTP configuration missing. Email not sent.")
        return

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient
    msg['Subject'] = subject
    msg['Reply-To'] = reply_to

    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_username, smtp_password)
        text = msg.as_string()
        server.sendmail(sender_email, recipient, text)
        server.quit()
        print(f"Email sent successfully to {recipient}")
    except Exception as e:
        print(f"Failed to send email: {e}")
        # On pourrait lever une exception ici si on veut informer l'utilisateur, 
        # mais attention à ne pas bloquer l'API si le SMTP rame.
        raise e

@router.post("/")
async def send_contact_message(contact: ContactMessage):
    # Destinataire fixe
    recipient = "hybrideclubdijon@gmail.com"

    print(f"--- Nouveau message de contact ---")
    print(f"De: {contact.nom} <{contact.email}>")
    print(f"Pour: {recipient}")
    print(f"Message: {contact.message}")
    print(f"----------------------------------")
    
    subject = f"Nouveau message de contact - {contact.nom}"
    body = f"""
Nouveau message reçu via le formulaire de contact :

Nom : {contact.nom}
Email : {contact.email}

Message :
{contact.message}
    """
    
    try:
        # Envoi synchrone (bloquant) pour être sûr que ça part, 
        # ou utiliser BackgroundTasks pour ne pas bloquer.
        # Ici on le fait en direct pour retourner une erreur si ça échoue.
        send_email_sync(recipient, subject, body, contact.email)
        return {"message": "Votre message a été envoyé avec succès à notre coach."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de l'envoi de l'email.")
