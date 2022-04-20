import classes from "./FindUsers.module.css";
import * as React from "react";
import {FC} from "react";

type Props =  {
    pageNumber: number
    totalPages: number
    setPage: (page: number, searchUsers: string) => void
    dispatch: (func: any) => void
    searchUsers: string
}


const Pagination: FC<Props> = ({pageNumber, totalPages,searchUsers, setPage, dispatch}) => {

    let mass = [] as Array<JSX.Element>

    for (let i: number =
        pageNumber === totalPages - 2 ? pageNumber - 2 :
            pageNumber === totalPages - 1 ? pageNumber - 3 :
                pageNumber === totalPages ? pageNumber - 4 :
                    pageNumber >= 3 ? pageNumber - 2 :
                        pageNumber === 2 ? pageNumber - 1 :
                            pageNumber === 1 ? pageNumber : 0; totalPages >= i; i++) {
        mass.push(
            <div key={i}
                 onClick={() => dispatch(setPage(i, searchUsers))}
                 className={pageNumber === i ? `${classes.page} ${classes.active}` : classes.page}>{i}
            </div>)
        if (mass.length >= 5) {
            return <>{mass.filter((page:JSX.Element) => page.props.children > 0)}</>
        }
    }
    return <>{mass}</>
}

export default Pagination