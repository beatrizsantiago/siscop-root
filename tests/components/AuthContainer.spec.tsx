import { render, screen } from '@testing-library/react';
import AuthContainer from '../../src/components/AuthContainer';
import '@testing-library/jest-dom';
import * as useMediaQueryModule from '@mui/material/useMediaQuery';

describe('AuthContainer', () => {
  const renderWithScreenSize = (isBigScreen: boolean) => {
    jest.spyOn(useMediaQueryModule, 'default').mockReturnValue(isBigScreen);

    return render(
      <AuthContainer>
        <div data-testid="child-content">Child Content</div>
      </AuthContainer>
    );
  };

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children correctly', () => {
    renderWithScreenSize(false);

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('should not show images on small screens', () => {
    renderWithScreenSize(false);

    expect(screen.queryByAltText('Seleiro')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Moinho')).not.toBeInTheDocument();
  });

  it('should show images on big screens', () => {
    renderWithScreenSize(true);

    expect(screen.getByAltText('Seleiro')).toBeInTheDocument();
    expect(screen.getByAltText('Moinho')).toBeInTheDocument();
  });
});
