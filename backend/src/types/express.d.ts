declare module "some-untyped-package";

declare global {
    namespace Express{
        interface Request{
            file?:any
        }
    }
}

export {}