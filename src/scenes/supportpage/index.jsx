import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';


import Header from "../../components/Header/Header";

const SupportPage = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SUPPORT" subtitle="Wie können wir dir helfen?" />
      </Box>


      <Box mt="20px">
        <Typography variant="h5">Häufig gestellte Fragen (FAQs)</Typography>
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Wie logge ich mich aus?
          </AccordionSummary>
          <AccordionDetails>
            Oben rechts auf den Button zum Ausloggen drücken.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Welche Möglichkeiten habe ich mich zu anmelden?
          </AccordionSummary>
          <AccordionDetails>
            Momentan kann man sich nur über Google Single-Sign-On oder einen erstellten Account Möglichkeiten anmelden.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Kann das Finanzamt meine Einnahmen und Ausgaben sehen?
          </AccordionSummary>
          <AccordionDetails>
            Nein, wir geben dem Finanzamt keine Daten weiter.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary id="panel-header" aria-controls="panel-content">
            Meine Frage wird nicht in dem FAQ beantwortet.
          </AccordionSummary>
          <AccordionDetails>
            Wir sind 24 Stunden am Tag erreichbar, kontaktiere uns per Mail oder Telefon!
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box mt="20px">
        <Typography variant="h5">Kontaktiere uns</Typography>
        <Typography>
          Wenn du weitere Hilfe benötigst, kannst du uns über die folgenden Kanäle erreichen:
        </Typography>
        <ul>
          <li>Email: support@finanzhawara.at</li>
          <li>Telefon: +43 676 7884808</li>
        </ul>
      </Box>

      <Box mt="20px">
        <Typography variant="h3"  align="center">Impressum</Typography>
        <Typography>
          Unternehmensname: FinanzHawara<br />
          Firmenbuchnummer: 384142n<br />
          Umsatzsteuer-Identifikationsnummer: ATU 67623878<br />
          Gerichtsstand: Wien<br /><br />

          Geschäftsführer: Aubrey Graham<br />
          Adresse: Favoritenstraße 226, 1100 Wien<br /><br />

          Telefon: +43 676 7884808<br />
          E-Mail: support@finanzhawara.at<br />
          Website: www.finanzhawara at<br /><br />
        </Typography>
        <Typography variant="h4">Haftungsausschluss und Rechtshinweis</Typography>
        <Typography variant="h5">Rechtswirksamkeit dieses Haftungsausschlusses</Typography>
        <Typography>
          Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde.
          Sofern Teile oder einzelne Formulierungen dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen sollten, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.
        </Typography>
      </Box>
    </Box>
  );
};

export default SupportPage;
