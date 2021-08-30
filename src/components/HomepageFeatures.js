import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: '日常记录',
    Svg: require('../../static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        日常的心得，遇到的坑，技巧，代码块。
      </>
    ),
  },
  {
    title: '工程方案',
    Svg: require('../../static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        前端工程的使用方案，拿来即用的配置代码，使用总结。
      </>
    ),
  },
  {
    title: '工具推荐',
    Svg: require('../../static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        高效率的工具推荐，以及使用方式。
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
