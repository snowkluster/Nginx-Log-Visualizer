import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, List, ListItem } from '@mui/material';
import jsPDF from 'jspdf';

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Security Analysis', 10, 10);

    const elements = document.querySelectorAll('.pdf-element');

    const promises: Promise<string>[] = [];

    const xPosition = 10;
    let yPosition = 30;

    elements.forEach(element => {
        const chartSVG = element.querySelector('svg');
        if (chartSVG) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            if (context) {
                const { width, height } = chartSVG.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;

                const svgString = new XMLSerializer().serializeToString(chartSVG);

                const img = new Image();
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
                const DOMURL = window.URL || window.webkitURL || window;
                const url = DOMURL.createObjectURL(svgBlob);

                promises.push(new Promise(resolve => {
                    img.onload = function () {
                        context.drawImage(img, 0, 0);
                        DOMURL.revokeObjectURL(url);
                        const imageData = canvas.toDataURL('image/png');
                        doc.addImage(imageData, 'PNG', xPosition, yPosition, width / 4, height / 4);
                        yPosition += height / 4 + 10;
                        resolve(imageData);
                    };
                    img.src = url;
                }));
            }
        }
    });

    Promise.all(promises).then(() => {
        doc.save('security_analysis.pdf');
    });
};


  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 5 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Panel
            </Typography>
            <Button color="inherit" onClick={generatePDF}>Generate Report</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          PaperProps={{ sx: { width: '300px' } }}
        >
          <List>
            <ListItem onClick={toggleDrawer}>
              <Link to="/livelogs" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="inherit">Toggle Graph</Button>
              </Link>
            </ListItem>
            <ListItem onClick={toggleDrawer}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button variant="text" color="inherit">Admin Panel</Button>
              </Link>
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </>
  );
}
