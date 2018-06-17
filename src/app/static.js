const randomize = (max, min) => Math.round(Math.random() * (max - min)) + min;

export { randomize,
        };

export const cache = {
    heroName: null,
};
