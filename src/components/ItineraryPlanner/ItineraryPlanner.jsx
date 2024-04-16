import React, { useState } from 'react';
import Markdown from 'markdown-to-jsx';
import axios from 'axios';
import { Container, Typography, TextField, Grid, Button } from '@material-ui/core';
// import { SaveAlt as SaveAltIcon } from '@material-ui/icons';
// import { html2pdf } from 'html2pdf.js';
// import MarkdownIt from 'markdown-it';

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState(null);
  const [formData, setFormData] = useState({
    source: '',
    destination: '',
    startDate: '',
    endDate: ''
  });

  // useEffect(() => {
  //   // Create a Markdown parser
  //   const md = new MarkdownIt();

  //   // Convert the Markdown text to HTML
  //   const html = md.render(itinerary);
    
  //   // Insert the converted HTML into the document
  //   document.getElementById("markdown-content").innerHTML = html;
  // }, [itinerary]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateItinerary = async (event) => {
    event.preventDefault();
    try {
      console.log("formdata :: ",formData);
      const response = await axios.post('http://127.0.0.1:5000/generate-itinerary', formData);
      setItinerary(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching itinerary:', error);
    }
  };

//   const handleDownload = () => {
//     const opt = {
//       margin: 0.5,
//       filename: 'itinerary.pdf',
//       image: { type: 'png', quality: 100 },
//       html2canvas: { scale: 0.8 },
//       jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
//     };

//     html2pdf().set(opt).from(document.querySelector('main')).toPdf().save();
// };


  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        Travel Itinerary Generator
      </Typography>
      <form onSubmit={generateItinerary} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="From"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="To"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Travel Date"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Return Date"
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Generate Itinerary
            </Button>
          </Grid>
        </Grid>
      </form>
      {itinerary && (
        <div>
          <br/>
          <Typography variant="h4" align="center" gutterBottom>
            Generated Itinerary Plan :: 
          </Typography>
          <Markdown align="left">{ itinerary.itinerary }</Markdown> 

        </div>
      )}
       {/* <Button
        startIcon={<SaveAltIcon />}
        variant="contained"
        color="primary"
        onClick={handleDownload}
        style={{ marginTop: '20px' }}
      >
        Download Itinerary
      </Button> */}
    </Container>
  );
};

export default ItineraryPlanner;
