import React from "react";

const Rank = ({ name, entries }) => {
    return(
        <div>
            <div className="white f3">
                {`${name}, your current rank is...`}  {/*文字列の中に${}で変数を入れたい場合は　` を使う */}
            </div>
            <div className="white f1">
                #{entries}
            </div>
        </div>
    );
}

export default Rank;