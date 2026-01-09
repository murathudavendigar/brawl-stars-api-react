import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cards from './Cards';

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

// Mock LazyImage
jest.mock('./common/LazyImage', () => {
  const LazyImage = ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />;
  return LazyImage;
});

describe('Cards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<Cards info={[]} searchName="" searchType="brawlers" />);
  });

  describe('when searchType is "brawlers"', () => {
    const brawlers = [
      { id: 1, name: 'Brawler 1', imageUrl: 'url1', description: 'Desc 1', bgColor: '#fff' },
      { id: 2, name: 'Brawler 2', imageUrl: 'url2', description: 'Desc 2', bgColor: '#000' },
    ];

    it('should display brawler cards', () => {
      render(<Cards info={brawlers} searchName="" searchType="brawlers" />);
      expect(screen.getByText('Brawler 1')).toBeInTheDocument();
      expect(screen.getByText('Brawler 2')).toBeInTheDocument();
    });

    it('should filter brawlers by searchName', () => {
      render(<Cards info={brawlers} searchName="Brawler 1" searchType="brawlers" />);
      expect(screen.getByText('Brawler 1')).toBeInTheDocument();
      expect(screen.queryByText('Brawler 2')).not.toBeInTheDocument();
    });

    it('should call navigate when "View Details" is clicked', () => {
      render(<Cards info={brawlers} searchName="" searchType="brawlers" />);
      const viewDetailsButtons = screen.getAllByText('View Details');
      fireEvent.click(viewDetailsButtons[0]);
      expect(mockedNavigate).toHaveBeenCalledWith('detail', { state: brawlers[0] });
    });
  });

  describe('when searchType is "gamemodes"', () => {
    const gamemodes = [
      { id: 1, name: 'Gamemode 1', imageUrl: 'url1', description: 'Desc 1', bgColor: '#fff' },
      { id: 2, name: 'Gamemode 2', imageUrl: 'url2', description: 'Desc 2', bgColor: '#000' },
    ];

    it('should display gamemode cards', () => {
      render(<Cards info={gamemodes} searchName="" searchType="gamemodes" />);
      expect(screen.getByText('Gamemode 1')).toBeInTheDocument();
      expect(screen.getByText('Gamemode 2')).toBeInTheDocument();
    });

    it('should filter gamemodes by searchName', () => {
      render(<Cards info={gamemodes} searchName="Gamemode 1" searchType="gamemodes" />);
      expect(screen.getByText('Gamemode 1')).toBeInTheDocument();
      expect(screen.queryByText('Gamemode 2')).not.toBeInTheDocument();
    });
  });

  describe('when searchType is "maps"', () => {
    const maps = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Map ${i + 1}`,
      imageUrl: `url${i + 1}`,
      description: `Desc ${i + 1}`,
      gameMode: { name: 'Game Mode', color: '#fff', imageUrl: 'gm-url' },
      link: 'link-url',
    }));

    it('should display the first 20 maps', () => {
      render(<Cards info={maps} searchName="" searchType="maps" />);
      expect(screen.getByText('Map 1')).toBeInTheDocument();
      expect(screen.getByText('Map 20')).toBeInTheDocument();
      expect(screen.queryByText('Map 21')).not.toBeInTheDocument();
    });

    it('should display more maps when "Load More" is clicked', () => {
      render(<Cards info={maps} searchName="" searchType="maps" />);
      const loadMoreButton = screen.getByText('Load More Maps');
      fireEvent.click(loadMoreButton);
      expect(screen.getByText('Map 21')).toBeInTheDocument();
      expect(screen.getByText('Map 25')).toBeInTheDocument();
    });

    it('should filter maps by searchName', () => {
      render(<Cards info={maps} searchName="Map 1" searchType="maps" />);
      expect(screen.getByText('Map 1')).toBeInTheDocument();
      expect(screen.queryByText('Map 2')).not.toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should render an empty container when info is null', () => {
      render(<Cards info={null} searchName="" searchType="brawlers" />);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should render an empty container when info is an empty array', () => {
      render(<Cards info={[]} searchName="" searchType="brawlers" />);
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    });

    it('should display no results if searchName does not match', () => {
      const brawlers = [{ id: 1, name: 'Brawler 1', imageUrl: 'url1', description: 'Desc 1', bgColor: '#fff' }];
      render(<Cards info={brawlers} searchName="Non Existent" searchType="brawlers" />);
      expect(screen.queryByText('Brawler 1')).not.toBeInTheDocument();
    });
  });
});
