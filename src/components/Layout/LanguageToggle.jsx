import { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const LanguageToggle = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('En');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <ButtonGroup className='buttonGroup d-flex gap-1 p-1 rounded-5'>
      <Button
        className='rounded-5 d-flex align-items-center justify-content-center'
        style={{
          backgroundColor: selectedLanguage === 'En' ? '#333333' : '#DCDCDC',
          color: selectedLanguage === 'En' ? 'white' : '#979797'
        }}
        onClick={() => handleLanguageChange('En')}
      >
        En
      </Button>
      <Button
        className='rounded-5 d-flex align-items-center justify-content-center'
        style={{
          backgroundColor: selectedLanguage === 'Es' ? '#333333' : '#DCDCDC',
          color: selectedLanguage === 'Es' ? 'white' : '#979797'
        }}
        onClick={() => handleLanguageChange('Es')}
      >
        Es
      </Button>
    </ButtonGroup>
  );
};

export default LanguageToggle;
