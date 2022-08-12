// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import clsx from 'clsx'
import MountainSvg from '../../static/img/undraw_docusaurus_mountain.svg'
import TreeSvg from '../../static/img/undraw_docusaurus_tree.svg'
import ReactSvg from '../../static/img/undraw_docusaurus_react.svg'

import styles from './HomepageFeatures.module.css'

interface FeatureItem {
  title: React.ReactNode
  Svg: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: React.ReactNode
}

const FeatureList: FeatureItem[] = [
  {
    title: '日常记录',
    Svg: MountainSvg,
    description: <>日常的心得，遇到的坑，技巧，代码块。</>,
  },
  {
    title: '工程方案',
    Svg: TreeSvg,
    description: <>前端工程的使用方案，拿来即用的配置代码，使用总结。</>,
  },
  {
    title: '工具推荐',
    Svg: ReactSvg,
    description: <>高效率的工具推荐，以及使用方式。</>,
  },
]

interface FeatureProps extends FeatureItem {}

const Feature: React.FC<FeatureProps> = ({ Svg, title, description }) => (
  <div className={clsx('col col--4')}>
    <div className="text--center">
      <Svg className={styles.featureSvg} />
    </div>
    <div className="text--center padding-horiz--md">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
)

const HomepageFeatures = () => (
  <section className={styles.features}>
    <div className="container">
      <div className="row">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </div>
    </div>
  </section>
)

export default HomepageFeatures
