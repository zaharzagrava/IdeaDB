import React, { ReactElement } from 'react';
import styles from './SearchBar.module.scss';

import { useQueryCache } from 'react-query';
import { Button, Divider } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { KnowledgeFileFields } from '../../types/types';
import { usePostKnowledgeFile } from '../../backendapi/graphql';
import { useDispatch } from 'react-redux';
import { AuthActionCreators } from '../../redux/auth';
import CodeField from '../CodeField/CodeField';

interface InitialValues {
  regexList: string;
}

const initialValues: InitialValues = {
  regexList: '',
};

interface Props {}

function SearchBar({}: Props): ReactElement {
  const dispatch = useDispatch();
  const queryCache = useQueryCache();

  const [postKnowledgeFile] = usePostKnowledgeFile(() => {
    dispatch(AuthActionCreators.regexListUpdated(['New File']));
    queryCache.invalidateQueries('knowledge_file');
  }, [
    KnowledgeFileFields.id,
    KnowledgeFileFields.srcText,
    KnowledgeFileFields.lastDateTimeModified,
  ]);

  const onCreateKnowledgeFile = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();

    postKnowledgeFile({
      srcText: 'New File',
      idToken: '',
    });
  };

  async function onSubmitRegexList(values: InitialValues) {
    dispatch(AuthActionCreators.regexListUpdated(values.regexList.split('\n')));
    queryCache.invalidateQueries('knowledge_file');
  }

  return (
    <div className={styles.filter}>
      <Button onClick={onCreateKnowledgeFile}>Create</Button>

      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={onSubmitRegexList}
      >
        <Form>
          <CodeField label={'Regex List'} name={'regexList'} />
          <Button type="submit" color="primary">
            Search
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default SearchBar;
