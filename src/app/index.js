import Magic from './magic';

const game = new Magic();

window.addEventListener('load', game.start.bind(game));
window.addEventListener('resize', game.resize.bind(game));
