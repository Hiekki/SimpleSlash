export type Choice<T> = {
    name: string;
    value: T;
};

type BuildArray<T, Size extends number, Tuple extends T[] = []> = Tuple['length'] extends Size
    ? Tuple
    : Tuple | BuildArray<T, Size, [...Tuple, T]>;

export type OptionsLength<T, Min extends number, Max extends number, Index extends T[] = []> = Index['length'] extends Min
    ? BuildArray<T, Max, Index>
    : OptionsLength<T, Min, Max, [...Index, T]>;
