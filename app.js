import React from 'react';
import CandidateApp from './app/components/candidate/CandidateApp';
import SponsorApp from './app/components/sponsor/SponsorApp';

React.render(<SponsorApp />, document.getElementById('sponsors-gallery'));
React.render(<CandidateApp />, document.getElementById('candidates-gallery'));
