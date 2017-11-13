import React from 'react';

// TODO (codeviking): This component is a duplicate of webui/webapp/app/components/IconSprite.jsx. When
// migrating hierplane to it's own dependency, I had to move this too. Eventually we should
// figure out a way tos hare these types of "common" components (or decide we're not going to,
// and remove this TODO).
export default class IconSprite extends React.Component {
  render() {
    return (
      <svg id="icons" xmlns="http://www.w3.org/2000/svg">

        <symbol id="icon__arrow-left" viewBox="0 0 48 50">
          <title>Parse nav previous icon</title>
          <polygon points="28.1,35.2 18,24.9 28.1,14.8 30,16.7 21.7,25 30,33.3 " />
        </symbol>

        <symbol id="icon__arrow-left--inverted" viewBox="0 0 48 50">
          <title>Inverted parse nav previous icon</title>
          <path d="M0.4,7.9v34.2C0.4,46.4,4,50,8.3,50h39.3V0L8.3,0C3.9,0,0.4,3.6,0.4,7.9z M18,24.9l10.1-10.1l1.9,1.9L21.7,25l8.3,8.3 l-1.9,1.9L18,24.9z" />
        </symbol>

        <symbol id="icon__arrow-right" viewBox="0 0 48 50">
          <title>Parse nav next icon</title>
          <polygon points="19.9,35.2 30,24.9 19.9,14.8 18,16.7 26.3,25 18,33.3 " />
        </symbol>

        <symbol id="icon__arrow-right--inverted" viewBox="0 0 48 50">
          <title>Inverted parse nav next icon</title>
          <path d="M39.7,0H0.4v50h39.3c4.3,0,7.9-3.6,7.9-7.9V7.9C47.6,3.6,44.1,0,39.7,0z M19.9,35.2L18,33.3l8.3-8.3L18,16.7l1.9-1.9 L30,24.9L19.9,35.2z" />
        </symbol>

        <symbol id="icon__close" viewBox="0 0 32 32">
          <title>Close (x) icon</title>
          <path d="M32 28.992l-12.992-12.992 12.928-12.992-2.944-3.008-12.992 12.992-12.992-12.992-2.944 3.008 12.928 12.992-12.992 12.992 3.008 3.008 12.992-13.056 12.992 13.056z" />
        </symbol>

        <symbol id="icon__collapse" viewBox="0 0 50 50">
          <title>Node collapse icon</title>
          <rect x="15.9" y="23.3" width="18.2" height="3.3" />
        </symbol>

        <symbol id="icon__collapse--inverted" viewBox="0 0 50 50">
          <title>Inverted node collapse icon</title>
          <path d="M42.1,0H7.9C3.5,0,0,3.6,0,7.9v34.2C0,46.4,3.6,50,7.9,50h34.2c4.3,0,7.9-3.6,7.9-7.9V7.9C50,3.6,46.5,0,42.1,0z M34.1,26.7 H15.9v-3.3h18.2V26.7z" />
        </symbol>

        <symbol id="icon__edit" viewBox="0 0 32 32">
          <title>Pencil edit icon</title>
          <path d="M4.736 19.392l19.392-19.392 7.872 7.872-19.392 19.392-7.872-7.872z" />
          <path d="M2.752 21.312l-2.752 10.688 10.688-2.752z" />
        </symbol>

        <symbol id="icon__error" viewBox="0 0 36 32">
          <title>Parse error icon</title>
          <path d="M35.712 27.84l-15.104-26.112c-1.344-2.304-3.456-2.304-4.8 0l-15.040 26.112c-1.344 2.304-0.256 4.16 2.368 4.16h30.208c2.624 0 3.712-1.856 2.368-4.16zM18.24 27.776c-1.28 0-2.304-1.024-2.304-2.304s1.024-2.304 2.304-2.304c1.28 0 2.304 1.024 2.304 2.304s-1.024 2.304-2.304 2.304zM20.544 19.52c0 1.28-1.024 2.304-2.304 2.304s-2.304-1.024-2.304-2.304v-9.536c0-1.28 1.024-2.304 2.304-2.304s2.304 1.024 2.304 2.304v9.536z" />
        </symbol>

        <symbol id="icon__expand" viewBox="0 0 50 50">
          <title>Node expand icon</title>
          <polygon points="34.1,23.3 26.7,23.3 26.7,15.9 23.3,15.9 23.3,23.3 15.9,23.3 15.9,26.7 23.3,26.7 23.3,34.1 26.7,34.1 26.7,26.7 34.1,26.7 " />
        </symbol>

        <symbol id="icon__expand--inverted" viewBox="0 0 50 50">
          <title>Inverted node expand icon</title>
          <path d="M42.1,0H7.9C3.5,0,0,3.6,0,7.9v34.2C0,46.4,3.6,50,7.9,50h34.2c4.3,0,7.9-3.6,7.9-7.9V7.9C50,3.6,46.5,0,42.1,0z M34.1,26.7 h-7.5v7.5h-3.3v-7.5h-7.5v-3.3h7.5v-7.5h3.3v7.5h7.5V26.7z" />
        </symbol>

        <symbol id="icon__keyboard" viewBox="0 0 57 32">
          <title>Keyboard icon</title>
          <path d="M53.76 0h-50.624c-1.664 0-3.072 1.408-3.072 3.072v25.92c0 1.664 1.408 3.072 3.072 3.072h50.688c1.664 0 3.072-1.408 3.072-3.072v-25.92c-0.064-1.664-1.408-3.072-3.136-3.072zM24.128 10.112h4.352v4.416h-4.416l0.064-4.416zM30.464 10.112h4.416v4.416h-4.416v-4.416zM36.8 10.112h4.416v4.416h-4.416v-4.416zM43.072 10.112h4.416v4.416h-4.416v-4.416zM49.28 10.112h5.12v4.416h-5.12v-4.416zM30.656 16.704v4.416h-4.416v-4.416h4.416zM17.6 10.112h4.416v4.416h-4.416v-4.416zM24.128 16.704v4.416h-4.416v-4.416h4.416zM10.944 10.112h4.416v4.416h-4.416v-4.416zM17.6 16.704v4.416h-4.416v-4.416h4.416zM4.416 10.112h4.416v4.416h-4.416c0 0 0-4.416 0-4.416zM26.688 3.712h4.352v4.416h-4.416l0.064-4.416zM33.024 3.712h4.416v4.416h-4.416c0-0.064 0-4.416 0-4.416zM39.424 3.712h4.48v4.416h-4.48v-4.416zM45.76 3.712h4.48v4.416h-4.48v-4.416zM20.096 3.712h4.416v4.416h-4.416v-4.416zM13.504 3.712h4.416v4.416h-4.416c0-0.064 0-4.416 0-4.416zM6.976 3.712h4.416v4.416h-4.416v-4.416zM10.944 16.704v4.416h-4.416v-4.416h4.416zM10.368 27.648h-5.888v-4.416h5.888v4.416zM46.72 27.648h-34.176v-4.416h34.176v4.416zM52.736 27.648h-4.416v-4.416h4.416v4.416zM32.832 21.056v-4.416h4.416v4.416h-4.416zM39.296 21.056v-4.416h4.416v4.416h-4.416zM45.76 21.056v-4.416h4.416v4.416h-4.416z" />
        </symbol>

        <symbol id="icon__logo-euclid" viewBox="0 0 32 32">
          <title>Euclid logo</title>
          <path d="M29.696 7.872l-13.504-7.808c-0.128-0.064-0.256-0.064-0.32 0l-13.632 7.808c-0.128 0.064-0.192 0.192-0.192 0.32v15.68c0 0.064 0 0.128 0.064 0.192v0 0c0 0.064 0.064 0.064 0.128 0.128v0l13.568 7.808c0.128 0.064 0.256 0.064 0.32 0l13.568-7.808c0.128-0.064 0.192-0.192 0.192-0.32v-15.68c0-0.128-0.064-0.256-0.192-0.32zM29.184 22.528l-12.224-21.248 12.288 7.104v14.144zM28.928 23.488h-25.856l12.928-22.464 12.928 22.464zM15.040 1.28l-12.224 21.248v-14.144l12.224-7.104zM16 31.232l-12.288-7.040h24.512l-12.224 7.040z" />
        </symbol>

        <symbol id="icon__sidebar" viewBox="0 0 32 32">
          <title>Show sidebar icon</title>
          <path d="M32 3.456v0h-32v25.088h32v-25.088zM3.2 25.344v-18.688h18.752v18.688h-18.752z" />
        </symbol>
      </svg>
    );
  }
}
