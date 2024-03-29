import classNames from "classnames/bind";
import styles from "./VocabularyFolderCard.module.scss";
import { Link, useParams } from 'react-router-dom';
import Vocabulary from "~/pages/Vocabulary/Vocabulary";
const cx = classNames.bind(styles);
function VocabularyFolderCard(props) {
  return (
    <div>
      <Link to={`/vocabulary/${props.vocabularyFolder?.id}`}>
      <div className={cx("vocabulary-folder")}>
            <div className={cx("vocabulary-folder__image")}>
                <img src="https://files.tofugu.com/articles/japanese/2022-11-08-teiru-tearu-teoku/header-1280x.jpg" className={cx("vocabulary-folder__img")}/>
            </div>
            <div className={cx("vocabulary-folder__content")}>
                <div className={cx("vocabulary-folder__title")}>
                  {props.vocabularyFolder?.title
                   ? props.vocabularyFolder?.title
                  : "2000Tango N5 Chapter 1 Section 1"}</div>
                <div className={cx("vocabulary-folder__description")}> {props.vocabularyFolder?.count} Vocabularies </div>
            </div>
        </div>
      </Link>
        
    </div>
  )
}

export default VocabularyFolderCard;
